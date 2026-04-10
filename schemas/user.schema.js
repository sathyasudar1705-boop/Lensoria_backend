import Joi from "joi";

export const userSignupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string(),
  city: Joi.string(),
});

export const userUpdateValidation = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  city: Joi.string(),
  profile_image: Joi.string(),
});
