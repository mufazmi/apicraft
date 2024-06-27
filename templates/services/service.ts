import { FilterQuery } from "mongoose";
import { BaseName, IBaseName } from "../models/base-kebab-model";

class BaseNameService {

    create = async (data: IBaseName) => await BaseName.create(data);

    findOne = async (filter: any) => await BaseName.findOne(filter);

    findAll = async (filter: any) => await BaseName.find(filter);

    update = async (filter: any, data: any) => await BaseName.findOneAndUpdate(filter, data, { new: true });

    destroy = async (filter: any) => await BaseName.deleteMany(filter);
}

export default new BaseNameService;

