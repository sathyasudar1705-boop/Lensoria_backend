import Joi from "joi";

export const bookingValidation = Joi.object({
  userId: Joi.string().required(),
  photographerId: Joi.string().required(),
  bookingDate: Joi.date().required(),
  amount: Joi.number().required(),
  notes: Joi.string().allow(""),
  status: Joi.string().valid("pending", "confirmed", "completed", "cancelled"),
});
