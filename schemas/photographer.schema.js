import Joi from "joi";

export const signupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  category: Joi.string(),
  city: Joi.string(),
  price: Joi.number()
});




export const profileValidation = Joi.object({
  phone: Joi.string(),
  category: Joi.string(),
  bio: Joi.string(),
  experience_years: Joi.number(),

  camera_model: Joi.array().items(Joi.string()),

  price: Joi.number(),

  city: Joi.string(),
  state: Joi.string()
});