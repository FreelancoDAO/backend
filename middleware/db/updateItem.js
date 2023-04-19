const { buildErrObject, itemNotFound } = require('../../middleware/utils');
/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const updateItem = (id = '', model = {}, req = {}, mongoRecord = null) => {
  return new Promise((resolve, reject) => {
    if (mongoRecord?.save) {
      for (const key in req) {
        mongoRecord[key] = req[key];
      }
      mongoRecord.save(async (error, item) => {
        if (error) {
          reject(buildErrObject(422, error?.message));
        }
        resolve(item);
      });
      return;
    }
    model.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true
      },
      async (err, item) => {
        try {
          if (err && err.code === 11000) {
            reject(
              buildErrObject(422, global.translate('CONTENT ALREADY EXISTS'))
            );
          }
          await itemNotFound(err, item, global.translate('NOT FOUND'));
          resolve(item);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

module.exports = { updateItem };
