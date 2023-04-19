const User = require("../../../models/user");
const { itemNotFound, buildErrObject } = require("../../../middleware/utils");

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (email = "") => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
        isDeleted: false,
        isActive: true,
      },
      "password loginAttempts blockExpires name email role verified verification isActive provider isOnboardingComplete phone",
      async (err, item) => {
        try {
          await itemNotFound(
            err,
            item,
            "USER DOES NOT EXIST"
          );
          resolve(item);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

module.exports = { findUser };
