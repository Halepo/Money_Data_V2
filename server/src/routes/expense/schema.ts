const Joi = require('joi');

export const registerExpenseSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24).required(),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
});

export const fetchAllExpenseSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24),
});

export const deleteExpenseSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
