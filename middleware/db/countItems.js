const { itemNotFound } = require('../../middleware/utils');

/**
 * Count Total item from database
 * @param {string} id - item id
 */
const countItems = (model = {}, filters = { isDeleted: false }) => {
  return new Promise((resolve, reject) => {
    model.countDocuments(filters, async (error, count) => {
      if (error) {
        reject(error);
      }
      resolve(count);
    });
  });
};

module.exports = { countItems };
