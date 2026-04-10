import Joi from "joi";

export const reviewValidation = Joi.object({
  userId: Joi.string().required(),
  photographerId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow(""),
});
