import { JoiCustom } from 'src/shared/joi-custom';

export const registerTransactionSchema = JoiCustom.object({
  userId: JoiCustom.string().hex().length(24).required(),
  accountId: JoiCustom.string().hex().length(24).required(),
  categoryId: JoiCustom.string().hex().length(24).required(),
  type: JoiCustom.string().valid('income', 'expense', 'transfer').required(),
  amount: JoiCustom.number().required(),
  currency: JoiCustom.currency(),
  reason: JoiCustom.string(),
  description: JoiCustom.string(),
  dateTime: JoiCustom.date().less('now'),
});
export const editTransactionSchema = JoiCustom.object({
  id: JoiCustom.string().hex().length(24).required(),
  categoryId: JoiCustom.string().hex().length(24),
  type: JoiCustom.string().valid('income', 'expense', 'transfer'),
  amount: JoiCustom.number().required(),
  currency: JoiCustom.currency(),
  reason: JoiCustom.string(),
  description: JoiCustom.string(),
  dateTime: JoiCustom.date(),
});

//TODO add currency
export const fetchTransactionSchema = JoiCustom.object({
  userId: JoiCustom.string().hex().length(24),
  id: JoiCustom.string().hex().length(24),
  accountId: JoiCustom.string().hex().length(24),
  categoryId: JoiCustom.string().hex().length(24),
  page: JoiCustom.number(),
  pageLimit: JoiCustom.number(),
  startDate: JoiCustom.string(),
  endDate: JoiCustom.string(),
  type: JoiCustom.string().valid('income', 'expense', 'transfer'),
  currency: JoiCustom.currency(),
  reason: JoiCustom.string(),
});

export const deleteTransactionSchema = JoiCustom.object({
  id: JoiCustom.string().hex().length(24).required(),
});
