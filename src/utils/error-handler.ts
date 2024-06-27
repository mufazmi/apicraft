import Constants from "./constants";
import Messages from "./messages";

class ErrorHandler extends Error {
    statusCode: number;
    errors?: Record<string, string>;

    constructor(message: string, statusCode: number, errorKey?: string) {
        super(message);
        this.statusCode = statusCode;
        console.log({ message });
        console.log({ errorKey });
        
        if (errorKey) {
            if (message == 'Bad Request')
                this.message = errorKey;
            else
                //@ts-ignore
                this.errorKey = errorKey;
        }

        ErrorHandler.captureStackTrace(this, this.constructor);
    }

    static createError = (
        statusCode: number,
        message: string,
        errorKey?: string
    ): ErrorHandler => new ErrorHandler(message, statusCode, errorKey);

    static notFound = (errorKey?: string, message: string = Messages.SERVER.NOT_FOUND) =>
        ErrorHandler.createError(Constants.STATUS_CODE.NOT_FOUND, message, errorKey);

    static forbidden = (errorKey?: string, message: string = Messages.SERVER.FORBIDDEN) =>
        ErrorHandler.createError(Constants.STATUS_CODE.FORBIDDEN, message, errorKey);

    static badRequest = (errorKey?: string, message: string = Messages.SERVER.BAD_REQUEST) =>
        ErrorHandler.createError(Constants.STATUS_CODE.BAD_REQUEST, message, errorKey);

    static serverError = (errorKey?: string, message: string = Messages.SERVER.SERVER_ERROR) =>
        ErrorHandler.createError(Constants.STATUS_CODE.SERVER_ERROR, message, errorKey);

    static unAuthorized = (errorKey?: string, message: string = Messages.SERVER.UNAUTORIZED_ACCESS) =>
        ErrorHandler.createError(Constants.STATUS_CODE.UNAUTORIZED, message, errorKey);
}

export default ErrorHandler;
