import { FilterQuery } from "mongoose";
import BaseModel, { IBase, IBaseDocument } from "../models/base-kebab-model";

class BaseService {
  
  create = async (data: IBase): Promise<IBaseDocument> => {
    return await BaseModel.create(data);
  };

  findOne = async (filter: FilterQuery<IBase>): Promise<IBaseDocument | null> => {
    return await BaseModel.findOne(filter);
  };

  findAll = async (filter: FilterQuery<IBase>): Promise<IBaseDocument[]> => {
    return await BaseModel.find(filter);
  };

  update = async (
    filter: FilterQuery<IBase>, 
    data: Partial<IBase>
  ): Promise<IBaseDocument | null> => {
    return await BaseModel.findOneAndUpdate(filter, data, { new: true });
  };

  destroy = async (filter: FilterQuery<IBase>): Promise<{ deletedCount?: number }> => {
    return await BaseModel.deleteMany(filter);
  };
}

export default new BaseService();
