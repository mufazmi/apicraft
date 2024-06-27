import Joi from "joi";

class TestValidation {
  create = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });

  update = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
  });
}

export default new TestValidation();
