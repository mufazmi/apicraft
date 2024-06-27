import { IRole, IRoleWithCompany } from "../models/role-model";
import { IUser, IUserDocument } from "../models/user-model";

export interface IUserWithRole extends IUserDocument{
   role:IRoleWithCompany 
}