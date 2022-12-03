const Joi = require('@hapi/joi');

export const registerIncomeSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message:
          'user_id is required and must be a valid ObjectId as a string!',
      };
    }),
  accountId: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message:
          'account_id is required and must be a valid ObjectId as a string!',
      };
    }),
  categoryId: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message:
          'category_id is required and must be a valid ObjectId as a string!',
      };
    }),
  amount: Joi.number()
    .required()
    .error(() => {
      return {
        message: 'amount is required and must be a valid number!',
      };
    }),
  reason: Joi.string().error(() => {
    return {
      message: 'reason must be a valid string!',
    };
  }),
  description: Joi.string().error(() => {
    return {
      message: 'description must be a valid string!',
    };
  }),
});
export const editIncomeSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message: 'id is required and must be a valid ObjectId as a string!',
      };
    }),
  categoryId: Joi.string()
    .hex()
    .length(24)
    .error(() => {
      return {
        message:
          'category_id is required and must be a valid ObjectId as a string!',
      };
    }),
  amount: Joi.number()
    .required()
    .error(() => {
      return {
        message: 'amount is required and must be a valid number!',
      };
    }),
  reason: Joi.string().error(() => {
    return {
      message: 'reason must be a valid string!',
    };
  }),
  description: Joi.string().error(() => {
    return {
      message: 'description must be a valid string!',
    };
  }),
});
export const fetchAllIncomeSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message:
          'user_id is required and must be a valid ObjectId as a string!',
      };
    }),
  accountId: Joi.string()
    .hex()
    .length(24)
    .error(() => {
      return {
        message: 'account_id must be a valid ObjectId as a string!',
      };
    }),
});

export const deleteIncomeSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message: 'id is required and must be a valid ObjectId as a string!',
      };
    }),
});
