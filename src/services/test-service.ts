import { FilterQuery } from "mongoose";
import { TestName, ITestName } from "../models/test-model";

class TestNameService {

    create = async (data: ITestName) => await TestName.create(data);

    findOne = async (filter: any) => await TestName.findOne(filter);

    findAll = async (filter: any) => await TestName.find(filter);

    update = async (filter: any, data: any) => await TestName.findOneAndUpdate(filter, data, { new: true });

    destroy = async (filter: any) => await TestName.deleteMany(filter);
}

export default new TestNameService;

