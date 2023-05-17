const { register } = require("./register");
const { validateUser } = require("./validateUser");
const { login } = require("./login");
const { getFullProfile } = require("./getFullProfile");
const { moralisLogin } = require("./moralisLogin");
const { moralisVerify } = require("./moralisVerify");
const { emailVerified } = require('./emailVerified');
const { emailVerify } = require('./emailVerify')
const { socialLogin } = require("./socialLogin");

module.exports = {
  register,
  validateUser,
  login,
  getFullProfile,
  moralisLogin,
  moralisVerify,
  emailVerified,
  emailVerify,
  socialLogin
};
