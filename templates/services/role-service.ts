import RoleModel, { IRole } from "../models/role-model";

class RoleService{

    create = async (data:IRole) => await RoleModel.create(data);

    findOne = async (filter:any) => await RoleModel.findOne(filter);

    findOneRelative = async (filter: any) =>  await RoleModel.findOne(filter)
          .populate({path:'company'});
      
    findAll = async (filter:any) => await RoleModel.find(filter);

    update = async (filter:any,data:any) => await RoleModel.findOneAndUpdate(data,filter);

    destroy = async (filter:any) => await RoleModel.deleteMany(filter);
}

export default new RoleService