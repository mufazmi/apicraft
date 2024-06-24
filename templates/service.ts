import { FilterQuery } from "mongoose";
import { ModelName, IModelName } from "../models/model-name-model";

class ModelNameService {

    create = async (data: IModelName) => await ModelName.create(data);

    findOne = async (filter: any) => await ModelName.findOne(filter);

    findAll = async (filter: any) => await ModelName.find(filter);

    update = async (filter: any, data: any) => await ModelName.findOneAndUpdate(filter, data, { new: true });

    destroy = async (filter: any) => await ModelName.deleteMany(filter);
}

export default new ModelNameService;

