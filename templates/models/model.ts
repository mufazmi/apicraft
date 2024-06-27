import { Schema, model, Document } from "mongoose";

export interface IBase extends Document {
  name: string;
}

const baseSchema = new Schema<IBase>({
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
  collection: 'collectionName'
});

const BaseModel = model<IBase>('Base', baseSchema, 'collectionName');

export default BaseModel;