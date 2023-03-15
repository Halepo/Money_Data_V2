import { JoiCustom } from 'src/shared/joi-custom';

export const getTransactionSchema = JoiCustom.object({
  id: JoiCustom.string().hex().length(24),
  category: JoiCustom.string(),
  description: JoiCustom.string(),
  category_for: JoiCustom.string().valid('expense', 'income'),
});

export const createCategorySchema = JoiCustom.object({
  category: JoiCustom.string().required(),
  description: JoiCustom.string(),
  transaction_type: JoiCustom.string().valid('expense', 'income').required(),
});

export const deleteCategorySchema = JoiCustom.object({
  id: JoiCustom.string().hex().length(24).required(),
});

export const editCategorySchema = JoiCustom.object({
  id: JoiCustom.string().hex().length(24).required(),
  category: JoiCustom.string().required(),
  description: JoiCustom.string(),
  transaction_type: JoiCustom.string().valid('expense', 'income', 'transfer'),
});
