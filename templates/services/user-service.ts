import UserModel, { IUser } from '../models/user-model';
import bcrypt from 'bcrypt';
import { toObjectId } from '../utils/joi-validation';
import { FilterQuery } from 'mongoose';
import RoleModel from '../models/role-model';

class UserService {
    
    create = async (data: IUser) => await UserModel.create(data);

    update = async (filter:any,data:any) => await UserModel.findOneAndUpdate(filter,data);

    findOne = async (filter: any) => await UserModel.findOne(filter);
    

    findOneAggregation = async (filter:any) => {
        console.log(filter);

        const pipeline = [
            {
                $match: filter,
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role",
                },
            },
            {
                $unwind: "$role",
            },
        ];

        return await UserModel.aggregate(pipeline);
    };

    findAllAggregation = async (filter: FilterQuery<IUser>) => {
        console.log(filter);
    
        const pipeline = [
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
        ];
    
        return await RoleModel.aggregate(pipeline);
    };
    

    findAll = async (filter:any) => await UserModel.find(filter);

    verifyPassword = async (password: string, hashPassword: string) => await bcrypt.compare(password, hashPassword);


    destroy = async (filter:any) => await UserModel.deleteMany(filter);

}

export default new UserService;