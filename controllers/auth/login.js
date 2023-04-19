// const { matchedData } = require("express-validator");

const { findUser, generateToken } = require("./helpers");

const { handleError, buildErrObject } = require("../../middleware/utils");
const { checkPassword } = require("../../middleware/auth");
const User = require("../../models/user");
/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user?.is_email_verified && user?.metamask_verified) {
      return res.status(200).send({ message: "user is valid" });
    } else {
      return res.send(401).send({ err: "Unauthorized" });
    }
    // res.status(200).json({
    //   token: generateToken(user._id),
    // });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { login };
