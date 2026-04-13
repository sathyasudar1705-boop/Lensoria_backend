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
  name: Joi.string().allow(''),
  phone: Joi.string().allow(''),
  category: Joi.string().allow(''),
  bio: Joi.string().allow(''),
  experience_years: Joi.number().allow(null),

  camera_model: Joi.array().items(Joi.string()),

  price: Joi.number().allow(null),

  city: Joi.string().allow(''),
  state: Joi.string().allow(''),
  profile_pic: Joi.string().allow(''),
  portfolio: Joi.array().items(Joi.string()),
  packages: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    duration: Joi.string().allow(''),
    deliverables: Joi.string().allow(''),
    description: Joi.string().allow(''),
    features: Joi.array().items(Joi.string())
  }).unknown(true)),
  social_links: Joi.object({
    instagram: Joi.string().allow(''),
    facebook: Joi.string().allow(''),
    website: Joi.string().allow('')
  }),
  unavailable_dates: Joi.array().items(Joi.string())
});