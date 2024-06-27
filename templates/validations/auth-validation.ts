import Joi from "joi"
import Constants from "../utils/constants"

class AuthValidation {

    register = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).required()
    })

    login = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).required()
    })


    forgot = Joi.object({
        email: Joi.string().email().lowercase().required(),
    })


    reset = Joi.object({
        email: Joi.string().email().lowercase().required(),
        otp: Joi.string().min(6).max(6).required(),
        password: Joi.string().min(8).required()
    })

    verify = Joi.object({
        email: Joi.string().email().lowercase().required(),
        otp: Joi.string().min(6).max(6).required(),
        type: Joi.string().default(Constants.OTP_TYPE.EMAIL_VERIFICATION),
    })

}

export default new AuthValidation