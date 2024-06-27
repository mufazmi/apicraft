import Joi from 'joi';
import mongoose from 'mongoose';
import { ObjectId, Types } from 'mongoose';

export function objectIdValidator(value:any, helpers:any) {
  if (mongoose.Types.ObjectId.isValid(value)) {
    return value;
  } else {
    return helpers.error('any.invalid');
  }
}

export function objectIdJoiSchema() {
  return Joi.string().custom(objectIdValidator, 'MongoDB ObjectId');
}


export function toObjectId(id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

