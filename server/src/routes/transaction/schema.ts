const Joi = require('joi');

export const registerTransactionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24).required(),
  type: Joi.string().valid('income', 'expense', 'transfer').required(),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
  dateTime: Joi.date().less('now'),
});
export const editTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24),
  type: Joi.string().valid('income', 'expense', 'transfer'),
  amount: Joi.number().required(),
  reason: Joi.string(),
  description: Joi.string(),
  dateTime: Joi.date(),
});
export const fetchAllTransactionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24),
  page: Joi.number(),
  pageLimit: Joi.number(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  type: Joi.string().valid('income', 'expense', 'transfer'),
  reason: Joi.string(),
});

export const deleteTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
