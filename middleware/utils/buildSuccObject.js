/**
 * Builds success object
 * @param {string} message - success text
 */
const buildSuccObject = (message = '', data = null) => {
  return {
    msg: message,
    ...(data && { data })
  };
};

module.exports = { buildSuccObject };
