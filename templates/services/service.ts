import { FilterQuery } from "mongoose";
import BaseModel, { IBase } from "../models/base-kebab-model";

class BaseService {

    create = async (data: IBase) => await BaseModel.create(data);

    findOne = async (filter: any) => await BaseModel.findOne(filter);

    findAll = async (filter: any) => await BaseModel.find(filter);

    update = async (filter: any, data: any) => await BaseModel.findOneAndUpdate(filter, data, { new: true });

    destroy = async (filter: any) => await BaseModel.deleteMany(filter);
}

export default new BaseService;

