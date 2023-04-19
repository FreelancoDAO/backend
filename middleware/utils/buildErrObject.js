/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code = '', message = '', data = '') => {
  return {
    code,
    message,
    ...((data) && { data }),
  };
};

module.exports = { buildErrObject };
