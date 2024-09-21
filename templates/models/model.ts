import { Schema, model, Document, Types } from "mongoose";
import CompanyModel from "./company-model";

export interface IBase {
  name: string;
  company: Types.ObjectId;
}

export interface IBaseDocument extends Document, IBase {
  
}

const baseSchema = new Schema<IBase>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: CompanyModel,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: 'collectionName',
  }
);

const BaseModel = model<IBase>('Base', baseSchema, 'collectionName');

export default BaseModel;
