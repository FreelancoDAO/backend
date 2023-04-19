const NodeCache = require('node-cache');
const { buildErrObject } = require('../middleware/utils');

const cache = new NodeCache({
  checkperiod: 60 * 60,
  deleteOnExpire: true,
  stdTTL: 0
});

module.exports.addOrUpdateNewKeyToCache = (key, value, ttl = undefined) => {
  if (!key || value === '') {
    throw buildErrObject(409, 'Fetching cache with no key / value');
  }
  if (!cache.has(key)) {
    cache.del(key);
  }
  if (ttl) {
    cache.set(key, value, ttl);
  } else {
    cache.set(key, value);
  }
};

module.exports.get = (key) => {
  if (!key) {
    throw buildErrObject(409, 'Fetching cache with no keys');
  }
  return cache.get(key);
};

module.exports.getMultipleKeys = (keys = []) => {
  if (!keys?.length) {
    throw buildErrObject(409, 'Fetching cache with no keys');
  }
  return cache.mget(keys);
};

module.exports.setMultipleKeys = (keyValuePairs = []) => {
  return cache.mset(keyValuePairs);
};

module.exports.deleteKey = (key) => {
  if (cache.has(key)) {
    cache.del(key);
  }
};
