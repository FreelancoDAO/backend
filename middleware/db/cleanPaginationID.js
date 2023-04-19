/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
const cleanPaginationID = (result = {}) => {
  result.list.map((element) => delete element.id);
  return result;
};

module.exports = { cleanPaginationID };
