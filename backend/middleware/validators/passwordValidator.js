const {check, validationResult} = require('express-validator');

exports.validatePassword = [
 
  check(
      'password',
      'Password must include one lowercase character, one uppercase character, a number, and a special character'
      )
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  check('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
    }

    // Indicates success of validator
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];