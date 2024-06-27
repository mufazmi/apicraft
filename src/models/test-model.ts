import { Schema, model, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
}

const testSchema = new Schema<ITest>({
  name: {
    type: String,
    required: true
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'tests'
});

const TestModel = model<ITest>('Test', testSchema, 'tests');

export default TestModel;