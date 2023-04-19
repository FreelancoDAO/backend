const { validateResult } = require('./validateResult');
const { check } = require('express-validator');

/**
 * Validates the id
 */
const validateId = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = { validateId };
