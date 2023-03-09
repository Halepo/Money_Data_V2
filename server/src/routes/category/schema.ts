const Joi = require('joi');

export const getTransactionSchema = Joi.object({
  id: Joi.string().hex().length(24),
  category: Joi.string(),
  description: Joi.string(),
  category_for: Joi.string().valid('expense', 'income'),
});

export const createCategorySchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string(),
  transaction_type: Joi.string().valid('expense', 'income').required(),
});

export const deleteCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const editCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  transaction_type: Joi.string().valid('expense', 'income', 'transfer'),
});
