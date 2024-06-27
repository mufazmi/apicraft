import { Schema, model, Types, Document } from 'mongoose';
import UserModel from './user-model';
import Constants from '../utils/constants';

export interface IOtp {
  otp: string;
  type?: string;
  reference: string;
}

export interface IOtpDocument extends Document, IOtp {}

const OtpSchema = new Schema<IOtpDocument>(
  {
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [Constants.OTP_TYPE.MOBILE_VERIFICATION, Constants.OTP_TYPE.FORGOT_PASSWORD,Constants.OTP_TYPE.EMAIL_VERIFICATION],
      default: Constants.OTP_TYPE.EMAIL_VERIFICATION,
    },
    reference: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    
timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

  }
);

const OtpModel = model<IOtpDocument>('Otp', OtpSchema, 'otps');

export default OtpModel;