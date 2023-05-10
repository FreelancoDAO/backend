const {
  getUserIdFromToken,
  findUserById,
  saveUserAccessAndReturnToken,
} = require("./helpers");
const { isIDGood, handleError } = require("../../middleware/utils");

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getFullProfile = async (req, res) => {
  try {
    const userId = await isIDGood(req.user._id);
    const user = await findUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getFullProfile };
