import Joi from "joi";

export const portfolioValidation = Joi.object({
  photographerId: Joi.string().required(),
  title: Joi.string().required(),
  images: Joi.array().items(Joi.string()).min(1).required(),
  description: Joi.string().allow(""),
  thumbnail: Joi.string().allow(""),
});
