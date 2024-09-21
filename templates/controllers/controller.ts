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
    const companyId = toObjectId(user.role.company!.id!.toString());

    const body = await baseValidation.create.validateAsync(req.body);
    const payload = { company: companyId, ...body };

    const data: IBase = await baseService.create(payload);

    return responseSuccess({
      res,
      message: "Base created successfully",
      data: new BaseDto(data),
    });
  };

  findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data: IBase | null = await baseService.findOne(filter);

    if (!data) {
      return next(ErrorHandler.notFound("No Base found"));
    }

    return responseSuccess({
      res,
      message: "Base found",
      data: new BaseDto(data),
    });
  };

  findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user, query } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IBase> = { company: companyId };

    if (query.name) {
      filter["name"] = { $regex: new RegExp(query.name as string, "i") };
    }

    // if (query.base) {
    //   filter["base"] = toObjectId(query.base.toString());
    // }

    const data: IBase[] = await baseService.findAll(filter);

    if (!data || data.length === 0) {
      return next(ErrorHandler.notFound("No Base found"));
    }

    return responseSuccess({
      res,
      message: "Base(s) found",
      data: data.map((base) => new BaseDto(base)),
    });
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const body = await baseValidation.update.validateAsync(req.body);

    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data: IBase | null = await baseService.update(filter, body);

    if (!data) {
      return next(ErrorHandler.badRequest("Base update failed"));
    }

    return responseSuccess({ res, message: "Base updated successfully" });
  };

  destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data = await baseService.destroy(filter);

    if (!data) {
      return next(ErrorHandler.badRequest("Base deletion failed"));
    }

    return responseSuccess({ res, message: "Base deleted successfully" });
  };
}

export default new BaseController();
