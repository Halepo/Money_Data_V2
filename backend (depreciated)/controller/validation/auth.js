const validator = require('validator');
const isEmpty = require('./helper/is-empty');

const validateAuthInput = (data) => {
  console.log('data', data)
  let errors = {};

  //check empty
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation) ? data.passwordConfirmation : '';

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.handle = 'User must be between 2 and 40 characters';
  }
  if (validator.isEmpty(data.email)) {
    errors.handle = 'Email is required';
  }
  if (validator.isEmpty(data.password, { min: 8, max: 40 })) {
    errors.status = 'Password must be between 8 and 40 characters';
  }
  if (data.password != data.passwordConfirmation) {
    errors.status = 'Passwords must match';
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


module.exports = { validateAuthInput }