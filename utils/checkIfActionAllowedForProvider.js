const { providers } = require('../constants');
const checkIfActionAllowedForProvider = (provider) => {
  if (provider === providers.manual) {
    return true;
  }
  return false;
};

module.exports = { checkIfActionAllowedForProvider };
