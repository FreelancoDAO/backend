const { itemNotFound } = require('../../middleware/utils');

/**
 * Archive item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const archiveItem = (id = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      {
        new: true
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, global.translate('NOT FOUND'));
          resolve(item);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

module.exports = { archiveItem };
