const jwt = require("jsonwebtoken");

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user = "") => {
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) +
      3600 * process.env.JWT_EXPIRATION_IN_MINUTES;

    // returns signed and encrypted token
    // return encrypt(
    return jwt.sign(
      {
        data: {
          user: user,
        },
        exp: expiration,
      },
      process.env.JWT_SECRET
    );
    // );
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken };
