import { Schema, model, Document } from "mongoose";

export interface IModelName extends Document {
  name: string;
}

const modelNameSchema = new Schema<IModelName>({
  name: { type: String, required: true },
});

export default model<IModelName>("ModelName", modelNameSchema);
