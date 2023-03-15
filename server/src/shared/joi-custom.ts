import Joi from 'joi';
import { currencyCodes } from './currencyCodes';

export let JoiCustom = Joi.extend({
  type: 'currency',
  base: Joi.string(),
  messages: {
    'string.currency': '{{#label}} must be valid ISO 4217 currency code',
  },
  validate(value, helpers): any {
    const code = value.toUpperCase();
    if (code in currencyCodes) {
      return { value: code };
    } else {
      return { value, errors: helpers.error('string.currency') };
    }
  },
});
export default JoiCustom;
