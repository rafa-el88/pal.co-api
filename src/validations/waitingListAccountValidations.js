import Joi from "joi";

const createWaitingListAccountSchema = Joi.object({
  name: Joi.string().max(200).required(),
  ddd: Joi.string().max(3).required(),
  phone: Joi.string().max(15).required(),
  email: Joi.string().email().max(200).required()
});

export { createWaitingListAccountSchema };
