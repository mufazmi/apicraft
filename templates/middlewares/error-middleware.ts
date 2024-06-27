import { Request, Response, NextFunction } from "express";
import Constants from "../utils/constants";
import Messages from "../utils/messages";
import { ValidationError } from "joi";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  
  err.statusCode = err.statusCode || Constants.STATUS_CODE.SERVER_ERROR;
  err.message = err.message || Messages.SERVER.SERVER_ERROR;

  let payload: { success: boolean; message: string; errors?: any } = {
    success: false,
    message: err.message,
    errors: {},
  };

  if (err instanceof ValidationError) {
    // Handle Joi validation errors
    for (const detail of err.details) {
      payload.errors[detail.path[0]] = detail.message;
    }
  } else if (err.errorKey) {
    err.statusCode = 422;
    payload.errors[err.errorKey] = payload.message;
  }
  else if (err.code === 11000 && err.keyPattern) {
    // Check for duplicate key error
    for (const field in err.keyPattern) {
      if (err.message.includes(field)) {
        err.statusCode = 422;
        payload.message = `${field} already exists`;
        break;
      }
    }
  }

  console.error(err);
  res.status(err.statusCode).json(payload);
};

export default errorMiddleware;
