import { Schema, model, Types, Document } from 'mongoose';
import CompanyModel, { ICompany } from './company-model';
import UserModel from './user-model';
import Constants from '../utils/constants';

export interface IRole {
  type: string;
  user?: Types.ObjectId;
  company?: Types.ObjectId;
  company_id?: Types.ObjectId;
}

export interface IRoleWithCompany {
  type: string;
  user?: Types.ObjectId;
  company?: ICompany;
  company_id?: Types.ObjectId;
}

export interface IRoleDocument extends Document,IRole {

}

const RoleSchema = new Schema<IRoleDocument>(
  {
    type: {
      type: String,
      enum: [Constants.USER.TYPE_SUPER_ADMIN, Constants.USER.TYPE_ADMIN, Constants.USER.TYPE_SUB_ADMIN, Constants.USER.TYPE_EMPLOYEE],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: CompanyModel,
      required: true,
    },
  },
  {
    
timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

  }
);

const RoleModel = model<IRoleDocument>('Role', RoleSchema, 'roles');

export default RoleModel;
