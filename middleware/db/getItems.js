const { buildErrObject } = require('../../middleware/utils');

const { listInitOptions } = require('./listInitOptions');
const { cleanPaginationID } = require('./cleanPaginationID');

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const getItems = async (req = {}, model = {}, query = {}) => {
  const options = await listInitOptions(req)
  query = { ...query, isDeleted: false }
  if (req.query && req.query.isActive) {
    query.isActive = req.query.isActive
  }
  return new Promise(async (resolve, reject) => {
    const totalCount = await model.countDocuments({ isDeleted: false });
    model.paginate(query, options, (err, items) => {
      if (err) {
        return reject(buildErrObject(422, err.message));
      }
      items.totalCount = totalCount;
      resolve(cleanPaginationID(items));
    });
  });
};

module.exports = { getItems };
