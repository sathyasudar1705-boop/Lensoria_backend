import Joi from "joi";

export const bookingValidation = Joi.object({
  userId: Joi.string().required(),
  photographerId: Joi.string().required(),
  bookingDate: Joi.date().required(),
  amount: Joi.number().required(),
  notes: Joi.string().allow(""),
  customerName: Joi.string().allow(""),
  customerPhone: Joi.string().allow(""),
  location: Joi.string().allow(""),
  requirements: Joi.string().allow(""),
  status: Joi.string().valid("pending", "accepted", "rejected", "confirmed", "editing", "framing", "delivered", "completed", "cancelled"),
});
