import { Response, NextFunction } from "express";
import { ITest } from "../models/test-model";
import testValidation from "../validations/test-validation";
import ErrorHandler from "../utils/error-handler";
import responseSuccess from "../utils/response";
import { AuthRequest } from "../interfaces/request-interface";
import testService from "../services/test-service";
import TestDto from "../dtos/test-dto";
import { FilterQuery } from "mongoose";
import { toObjectId } from "../utils/joi-validation";

class TestController {

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const companyId = toObjectId(user.role.company_id!.toString());

    const body = await testValidation.create.validateAsync(req.body);

    const payload = {
      ...body
    }

    const data: ITest = await testService.create(payload);

    return responseSuccess({ res: res, message: "Test Created Success", data: new TestDto(data) });

  };

  findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company_id!.toString());
    const filter: FilterQuery<ITest> = { _id: toObjectId(id), company: companyId };
    const data: ITest | null = await testService.findOne(filter);
    return data ? responseSuccess({ res: res, message: "Test Found", data: new TestDto(data) }) : next(ErrorHandler.notFound("No Test Found"));
  };

  findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user, query } = req
    const companyId = toObjectId(user.role.company_id!.toString());

    const filter: FilterQuery<ITest> = { company: companyId };

    if (query.name) {
      filter["name"] = {
        $regex: new RegExp(query.name as string, 'i')
      }
    }

    // if (query.test) {
    //   filter["test"] = toObjectId(query.test.toString());
    // }

    const data: ITest[] = await testService.findAll(filter);

    return data ? responseSuccess({ res: res, message: "Test Found", data: data.map((x) => new TestDto(x)) }) : next(ErrorHandler.notFound("No Test Found"));
  };


  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    const body = await testValidation.update.validateAsync(req.body);

    const filter = {};
    const data: ITest | null = await testService.update(filter, body);

    return data ? responseSuccess({ res: res, message: "Test Updated" }) : next(ErrorHandler.serverError("Test Update Failed"));
  };

  destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const body = await testValidation.update.validateAsync(req.body);
    const filter = {};
    const data = await testService.destroy(filter);

    return data ? responseSuccess({ res: res, message: "Test Updated" }) : next(ErrorHandler.serverError("Test Update Failed"));
  };
}

export default new TestController();
