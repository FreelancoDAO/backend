const axios = require('axios').default;
const { providers } = require('../constants');

exports.request = async (provider, url, token) => {
  let requestConfig;
  if (provider === providers.google) {
    requestConfig = {
      url,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  } else if (provider === providers.facebook) {
    requestConfig = {
      url: url + token,
      method: 'get'
    };
  } else if (provider === providers.phone) {
    requestConfig = {
      url,
      method: 'get'
    };
  }
  return await axios(requestConfig);
};
