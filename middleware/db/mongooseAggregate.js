const { buildErrObject } = require('../../middleware/utils');

const { listInitOptions } = require('./listInitOptions');
const { cleanPaginationID } = require('./cleanPaginationID');

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const mongooseAggregate = async (req = {}, model = {}, aggregate = {}) => {
  const options = await listInitOptions(req);
  return new Promise((resolve, reject) => {
    model.aggregatePaginate(aggregate, options, (err, items) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      resolve(cleanPaginationID(items));
    });
  });
};

module.exports = { mongooseAggregate };
