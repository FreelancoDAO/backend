const { buildSuccObject, itemNotFound } = require('../../middleware/utils');

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const itemSoftDelete = (id = '', model = {}, returnDeletedRecord = false) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      {
        new: true,
        runValidators: true
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, global.translate('NOT FOUND'));
          resolve(
            buildSuccObject(
              global.translate('DELETED'),
              returnDeletedRecord ? item : null
            )
          );
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

module.exports = { itemSoftDelete };
