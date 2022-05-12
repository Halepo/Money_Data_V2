const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.name) ? data.name : '';
  data.status = !isEmpty(data.email) ? data.email : '';
  data.skills = !isEmpty(data.password) ? data.password : '';

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.handle = 'User must be between 2 and 40 characters';
  }
  if (validator.isEmpty(data.email)) {
    errors.handle = 'Email is required';
  }
  if (validator.isEmpty(data.password, { min: 8, max: 40 })) {
    errors.status = 'Password must be between 8 and 40 characters';
  }

  if (!isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Not a valid Email';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
