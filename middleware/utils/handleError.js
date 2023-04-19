/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Prints error in console
  console.log('Error: ', err);
  // Sends error to user
  const errCode = typeof err?.code == 'number' ? err.code : 500;
  res.status(errCode).json({
    errors: {
      msg: err.message,
      ...(err.data && { data: err.data })
    }
  });
};

module.exports = { handleError };
