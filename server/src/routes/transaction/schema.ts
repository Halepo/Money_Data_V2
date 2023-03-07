const Joi = require('joi').extend(require('joi-currency-code'));

export const registerTransactionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24).required(),
  type: Joi.string().valid('income', 'expense', 'transfer').required(),
  amount: Joi.number().required(),
  currency: Joi.string().currency(),
  reason: Joi.string(),
  description: Joi.string(),
  dateTime: Joi.date().less('now'),
});
export const editTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24),
  type: Joi.string().valid('income', 'expense', 'transfer'),
  amount: Joi.number().required(),
  currency: Joi.string().currency(),
  reason: Joi.string(),
  description: Joi.string(),
  dateTime: Joi.date(),
});

//TODO add currency
export const fetchTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24),
  userId: Joi.string().hex().length(24).required(),
  accountId: Joi.string().hex().length(24),
  categoryId: Joi.string().hex().length(24),
  page: Joi.number(),
  pageLimit: Joi.number(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  type: Joi.string().valid('income', 'expense', 'transfer'),
  currency: Joi.string().currency(),
  reason: Joi.string(),
});

export const deleteTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
