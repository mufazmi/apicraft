import { FilterQuery } from "mongoose";
import { Base, IBase } from "../models/base-kebab-model";

class BaseService {

    create = async (data: IBase) => await Base.create(data);

    findOne = async (filter: any) => await Base.findOne(filter);

    findAll = async (filter: any) => await Base.find(filter);

    update = async (filter: any, data: any) => await Base.findOneAndUpdate(filter, data, { new: true });

    destroy = async (filter: any) => await Base.deleteMany(filter);
}

export default new BaseService;

