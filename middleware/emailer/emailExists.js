const User = require('../../models/user');
const { buildErrObject } = require('../../middleware/utils');

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
const emailExists = (email = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
        isDeleted: false,
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message));
        }

        if (item) {
          return reject(buildErrObject(422, global.translate('EMAIL ALREADY EXISTS')));
        }
        resolve(false);
      }
    );
  });
};

module.exports = { emailExists };
