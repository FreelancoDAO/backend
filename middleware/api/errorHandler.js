const { buildErrObject } = require('../utils');

/**
 * Error handler for intercepting requests
 */
const errorHandler = (error, req, res, _) => {
  const message = error?.message || global.translate('Something went wrong'),
    code = error?.code || 500,
    stack = error?.stack || null;
  return res.status(code).json(buildErrObject(code, message, stack));
};

module.exports = { errorHandler };
