const { buildErrObject } = require('../../middleware/utils');
const { buildSort } = require('./buildSort');
const myCustomLabels = {
  totalDocs: 'count',
  docs: 'list',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount'
};

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = req.query.order || -1;
      const sort = req.query.sort || 'createdAt';
      const sortBy = buildSort(sort, order);
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 500;
      const options = {
        sort: sortBy,
        lean: true,
        page,
        limit,
        customLabels: myCustomLabels
      };
      if (req.populate) {
        options.populate = req.populate;
      }
      if (req.select) {
        options.select = req.select;
      }
      resolve(options);
    } catch (error) {
      console.log(error.message);
      reject(buildErrObject(422,
        //  global.translate(
          'ERROR WITH INIT OPTIONS'
          // )
          ));
    }
  });
};

module.exports = { listInitOptions };
