import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token-service';
import ErrorHandler from '../utils/error-handler';
import { TokenExpiredError } from 'jsonwebtoken';
import Messages from '../utils/messages';

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorization = req.headers.authorization ?? req.cookies?.authorization;

  if (!authorization)
    return next(ErrorHandler.unAuthorized());
  const accessToken = authorization!.split(' ')[1];
  // console.log({ accessToken })


  try {
    const tokenUser = tokenService.verifyAccessToken(accessToken);

    // console.log({ tokenUser })
    if (!tokenUser)
      return next(ErrorHandler.unAuthorized());

    // console.log({tokenUser})

    //@ts-ignore
    req.user = tokenUser;

  } catch (e) {
    if (e instanceof TokenExpiredError) {
      // we can try to renew the token from here if there is refresh token present in request

      return next(ErrorHandler.unAuthorized(Messages.AUTH.TOKEN_EXPIRED));
    } else
      return next(ErrorHandler.unAuthorized());
  }

  return next();
}


export default auth;