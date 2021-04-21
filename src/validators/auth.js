// const { check, validationResult }= require('express-validator');
const { check, validationResult} = require("express-validator")
exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6})
    .withMessage('Password must be at least 6 character long')
];
exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6})
    .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(400).json({ error: errors[0].msg });
    next();
  };