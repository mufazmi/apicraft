import { Response, NextFunction } from "express";
import { IBase } from "../models/base-kebab-model";
import baseValidation from "../validations/base-kebab-validation";
import ErrorHandler from "../utils/error-handler";
import responseSuccess from "../utils/response";
import { AuthRequest } from "../interfaces/request-interface";
import baseService from "../services/base-kebab-service";
import BaseDto from "../dtos/base-kebab-dto";
import { FilterQuery } from "mongoose";
import { toObjectId } from "../utils/joi-validation";

class BaseController {

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const companyId = toObjectId(user.role.company!.toString());

    const body = await baseValidation.create.validateAsync(req.body);

    const payload = {
      ...body
    }

    const data: IBase = await baseService.create(payload);

    return responseSuccess({ res: res, message: "Base Created Success", data: new BaseDto(data) });

  };

  findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.toString());
    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data: IBase | null = await baseService.findOne(filter);
    return data ? responseSuccess({ res: res, message: "Base Found", data: new BaseDto(data) }) : next(ErrorHandler.notFound("No Base Found"));
  };

  findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user, query } = req
    const companyId = toObjectId(user.role.company!.toString());

    const filter: FilterQuery<IBase> = { company: companyId };

    if (query.name) {
      filter["name"] = {
        $regex: new RegExp(query.name as string, 'i')
      }
    }

    // if (query.base) {
    //   filter["base"] = toObjectId(query.base.toString());
    // }

    const data: IBase[] = await baseService.findAll(filter);

    return data ? responseSuccess({ res: res, message: "Base Found", data: data.map((x) => new BaseDto(x)) }) : next(ErrorHandler.notFound("No Base Found"));
  };


  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    const body = await baseValidation.update.validateAsync(req.body);

    const filter = {};
    const data: IBase | null = await baseService.update(filter, body);

    return data ? responseSuccess({ res: res, message: "Base Updated" }) : next(ErrorHandler.serverError("Base Update Failed"));
  };

  destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const body = await baseValidation.update.validateAsync(req.body);
    const filter = {};
    const data = await baseService.destroy(filter);

    return data ? responseSuccess({ res: res, message: "Base Updated" }) : next(ErrorHandler.serverError("Base Update Failed"));
  };
}

export default new BaseController();
