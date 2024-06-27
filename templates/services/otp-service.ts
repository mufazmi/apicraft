import crypto from 'crypto';
import OtpModel, { IOtpDocument } from '../models/otp-model';
import { Types } from 'mongoose';

class OtpService {

  generateOtp = (): number => crypto.randomInt(100000, 999999);

  storeOtp = async (user: string | Types.ObjectId, otp: number, type: string): Promise<IOtpDocument> => {
    return await OtpModel.create({ user, otp, type });
  };

  removeOtp = async (user: string | Types.ObjectId): Promise<void> => {
    await OtpModel.deleteOne({ user });
  };

  verifyOtp = async (user: string | Types.ObjectId, otp: number, type: string): Promise<string> => {
    const otpData = await OtpModel.findOne({ user, otp, type });
    console.log({ otpData });
  
    if (otpData) {
      const now = new Date(); 
      //@ts-ignore
      const created_at = new Date(otpData.created_at); 
  
      const expirationTime = new Date(created_at.getTime() + 15 * 60 * 1000);
  
      await this.removeOtp(user);
  
      if (now < expirationTime) {
        return 'VALID';
      } else {
        return 'EXPIRED';
      }
    } else {
      return 'INVALID';
    }
  };
  
  
}

export default new OtpService();