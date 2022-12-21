const Joi = require('joi');

export const registerIncomeSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24).required(),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
});
export const editIncomeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
});
export const fetchAllIncomeSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24),
});

export const deleteIncomeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
