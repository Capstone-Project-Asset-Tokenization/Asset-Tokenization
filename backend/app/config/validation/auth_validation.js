import Joi from "joi";

export const RegistrationValidatorSchema = Joi.object({
  fullName: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  // The validation depends on the type of the legalIdNo field in the database.
  legalIdNo: Joi.number().required(),
  walletId: Joi.string().default(""),
});

export const LoginRegistratinValidatorSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
