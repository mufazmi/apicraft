import { Request, Response, NextFunction } from "express";
import UserDto from "../dtos/user-dto";
import { IUser, IUserDocument } from "../models/user-model";
import tokenService from "../services/token-service";
import userService from "../services/user-service";
import ErrorHandler from "../utils/error-handler";
import Messages from "../utils/messages";
import responseSuccess from "../utils/response";
import authValidation from "../validations/auth-validation";
import roleService from "../services/role-service";
import AuthDto from "../dtos/auth-dto";
import mailService from "../services/mail-service";
import otpService from "../services/otp-service";
import Constants from "../utils/constants";
import {OAuth2Client} from 'google-auth-library';
import axios from 'axios';


class AuthController {

  register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const body = await authValidation.register.validateAsync(req.body);
    const user = await userService.findOne({email:body.email});
    if(user)
      return next(ErrorHandler.forbidden("email","Email already registered"))
    const response: IUserDocument = await userService.create(body);
    const otp = otpService.generateOtp();
    await otpService.storeOtp(response._id,otp,Constants.OTP_TYPE.EMAIL_VERIFICATION);
    await mailService.sendMail({type:'verifyEmail',name:response.name,to:response.email!,code:otp.toString()});
    return responseSuccess({ res: res, message: Messages.AUTH.REGISTER_SUCCESS, data: response });
}

  login = async (req: Request, res: Response, next: NextFunction) => {
      const body = await authValidation.login.validateAsync(req.body);
      const user = await userService.findOne({ email: body.email } as IUserDocument);
      if (!user)
        return next(ErrorHandler.notFound("email",Messages.USER.NOT_FOUND));

      const isValidPassword = await userService.verifyPassword(body.password, user.password!);
      if (!isValidPassword)
        return next(ErrorHandler.unAuthorized("password",Messages.AUTH.PASSWORD_INVALID));

      if (!user.is_email_verified)
        return next(ErrorHandler.forbidden("email","Email Verification Pending"));
      
      const role = await roleService.findOneRelative({user:user._id});

      const data = new AuthDto(user,role);

      const address = true; // other checks flags

      if(!address)
          data.has_company_address = false

      res.json({ success: true, message: Messages.AUTH.AUTH_SUCCESS, data });
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    console.log("header", req.header);
    console.log("headers", req.headers);
    let refreshTokenReq: string = req.header("refresh-token") ?? 'null';
    if (!refreshTokenReq)
        return next(ErrorHandler.unAuthorized("Refresh Token Not Valid"));

    const token = tokenService.verifyRefreshToken(refreshTokenReq);

    console.log({token})

    if (!token)
        return next(ErrorHandler.unAuthorized("Refresh Token Not Valid"));

    //@ts-ignore
    const userToken = token as IUserDocument;

    const user = await userService.findOne({ email: userToken.email } as IUserDocument);
    if (!user)
      return next(ErrorHandler.notFound("email",Messages.USER.NOT_FOUND));

    const role = await roleService.findOneRelative({user:user._id});

    const data = new AuthDto(user,role);

    const address = true; // other checks flags

    if(!address)
        data.has_company_address = false

    res.json({ success: true, message: Messages.AUTH.AUTH_SUCCESS, data });
};

forgot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const body = await authValidation.forgot.validateAsync(req.body);

  const user = await userService.findOne({ email: body.email });

  if (!user) {
    return next(ErrorHandler.notFound("email",'Invalid Email Address'));
  }

  const { _id: userId, name, email } = user;
  const otp = otpService.generateOtp();
  const type = Constants.OTP_TYPE.FORGOT_PASSWORD;

  await otpService.removeOtp(userId);
  await otpService.storeOtp(userId, otp, type);

  await mailService.sendMail({type:'forgotPassword',name,to:email!,code:otp.toString()});

  res.json({ success: true, message: 'Email has been sent to your email address' });
};

reset = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const body = await authValidation.reset.validateAsync(req.body);

  const { email, otp, password } = body;

  const user = await userService.findOne({ email });

  if (!user) {
    return next(ErrorHandler.notFound("email",'No Account Found'));
  }

  const { _id: userId } = user;
  const type = Constants.OTP_TYPE.FORGOT_PASSWORD;

  const response = await otpService.verifyOtp(userId, otp, type);

  if (response === 'INVALID') {
    return next(ErrorHandler.badRequest("otp",'Invalid OTP'));
  }

  if (response === 'EXPIRED') {
    return next(ErrorHandler.badRequest("otp",'OTP has been Expired'));
  }

  const  modifiedCount  = await userService.update(userId, {password});

  await mailService.sendMail({type:'resetPassword',name:user.name,to:email});

  return res.json({ success: true, message: 'Password has been reset successfully' })
  
};


verify = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const body = await authValidation.verify.validateAsync(req.body);

  const { email, otp } = body;

  const user = await userService.findOne({ email });

  if (!user) {
    return next(ErrorHandler.notFound("email",'No Account Found'));
  }

  if (user.is_email_verified) {
    return next(ErrorHandler.notFound("email",'Email Already Verified'));
  }

  const { _id: userId } = user;
  const type = Constants.OTP_TYPE.EMAIL_VERIFICATION;

  const response = await otpService.verifyOtp(userId, otp, type);

  if (response === 'INVALID') {
    return next(ErrorHandler.badRequest("otp",'Invalid OTP'));
  }

  if (response === 'EXPIRED') {
    return next(ErrorHandler.badRequest('OTP has been Expired'));
  }

  user.is_email_verified = true;
  const data = await user.save();

  return data
    ? res.json({ success: true, message: 'Email has been varified' })
    : next(ErrorHandler.serverError("email",'Failed to verify your email'));
};

// logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { refreshToken } = req.cookies;
//   const { _id } = req.user;

//   const response = await tokenService.removeRefreshToken(_id, refreshToken);

//   res.clearCookie('refreshToken');
//   res.clearCookie('accessToken');

//   return response.modifiedCount === 1
//     ? res.json({ success: true, message: 'Logout Successfully' })
//     : next(ErrorHandler.unAuthorized());
// };


google = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { access_token } = req.body;

  if (!access_token) {
    return next(ErrorHandler.badRequest());
  }

  try {
    const resp = await client.verifyIdToken({ idToken: access_token, audience: process.env.GOOGLE_CLIENT_ID });
    
    console.log({resp});
    //@ts-ignore
    if (resp.payload) {
      //@ts-ignore
      const { name, email, picture: image } = resp.payload;

      let user = await userService.findOne({ email });

      if (!user) {
        user = await userService.create({ name, email, image, is_email_verified: true } as IUserDocument);
      }

      const role = await roleService.findOneRelative({user:user._id});

      const data = new AuthDto(user,role);

      const address = true; // other checks flags

      if(!address)
          data.has_company_address = false

      res.json({ success: true, message: Messages.AUTH.AUTH_SUCCESS, data });

    } else {
      return next(ErrorHandler.serverError('Failed To Login'));
    }
  } catch (error) {
    console.log(error);
    return next(ErrorHandler.serverError('Failed To Login'));
  }
};

facebook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const body = req.body;

  if (!body.accessToken || !body.userId) {
    return next(ErrorHandler.badRequest('Failed To Login'));
  }

  const facebookUrl = `https://graph.facebook.com/v2.11/${body.userId}/?field=id,name,email&access_token=${body.accessToken}`;

  try {
    const facebookResponse = await axios.get(facebookUrl);

    if (facebookResponse.status !== 200) {
      return next(ErrorHandler.badRequest('Failed To Login'));
    }

    const { name, email } = facebookResponse.data;

    let user = await userService.findOne({ email });

    if (!user) {
      user = await userService.create({ name, email, is_email_verified: true } as IUserDocument);
    }

    const role = await roleService.findOneRelative({ user: user._id });

    const data = new AuthDto(user, role);

    // const address = await companyAddressService.findOne({ company: data.role.company_id });

    const address = true;


    if (!address) {
      data.has_company_address = false;
    }


    res.json({ success: true, message: Messages.AUTH.AUTH_SUCCESS, data });
  } catch (error) {
    return next(ErrorHandler.serverError('Failed To Login'));
  }
};

}

export default new AuthController;