import Joi from "joi";

class ModelNameValidation {
  create = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });

  update = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
  });
}

export default new ModelNameValidation();
