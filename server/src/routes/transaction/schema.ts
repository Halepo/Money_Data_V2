const Joi = require('joi');

export const registerTransactionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24).required(),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
});
export const editTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
});
export const fetchAllTransactionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24),
});

export const deleteTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
