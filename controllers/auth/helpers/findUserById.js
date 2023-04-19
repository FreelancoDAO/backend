const User = require("../../../models/user");
const { itemNotFound } = require("../../../middleware/utils");
const mongoose = require("mongoose");
const Freelancer = require("../../../models/freelancer");

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
// const findUserById = (userId = "") => {
//   return new Promise((resolve, reject) => {
//     User.findOne(
//       {
//         _id: mongoose.Types.ObjectId(userId),
//         isDeleted: false,
//         isActive: true,
//       },
//       async (err, item) => {
//         try {
//           await itemNotFound(err, item, "USER DOES NOT EXIST");
//           resolve(item);
//         } catch (error) {
//           reject(error);
//         }
//       }
//     );
//   });
// };

const findUserById = (userId = "") => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: mongoose.Types.ObjectId(userId),
        isDeleted: false,
        isActive: true,
      });

      if (!user) {
        throw new Error("USER DOES NOT EXIST");
      }

      let userData = { ...user._doc };

      if (user.freelancer_ref) {
        const freelancer = await Freelancer.findOne({
          _id: mongoose.Types.ObjectId(user.freelancer_ref),
        });

        if (freelancer) {
          userData = { ...userData, freelancer };
        }
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { findUserById };
