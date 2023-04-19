const { itemNotFound } = require("../../middleware/utils");

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItem = (id = "", model = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id, isDeleted: false }, async (err, item) => {
      try {
        await itemNotFound(err, item, "NOT FOUND");
        resolve(item);
      } catch (error) {
        reject(error);  
      }
    });
  });
};

module.exports = { getItem };
