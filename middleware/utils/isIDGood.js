const mongoose = require('mongoose');
const { buildErrObject } = require('./buildErrObject');

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 */
const isIDGood = async (id = '') => {
  return new Promise((resolve, reject) => {
    const goodID = mongoose.Types.ObjectId.isValid(id);
    return goodID
      ? resolve(id)
      : reject(
          buildErrObject(
            422,
            global.translate('Resource requested with incorrect data')
          )
        );
  });
};

/**
 * Checks if given ID is Object Id or not
 * @param {string} id - id to check
 */
const isObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { isIDGood, isObjectId };
