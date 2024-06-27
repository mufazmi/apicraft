import { Request } from "express";
import User, { IUser } from "../models/user-model";
import { IRole } from "../models/role-model";
import { IUserWithRole } from "./user-interface";
import { ParamsDictionary } from "express-serve-static-core";

export interface AuthRequest extends Request {
  user: IUserWithRole;
  params: ParamsDictionary; 
  body: any;
}
