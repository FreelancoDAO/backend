const { register } = require("./register");
const { validateUser } = require("./validateUser");
const { login } = require("./login");
const { getRefreshToken } = require("./getRefreshToken");
const { moralisLogin } = require("./moralisLogin");
const { moralisVerify } = require("./moralisVerify");
const {emailVerified}=require('./emailVerified');
const {emailVerify}=require('./emailVerify')

module.exports = {
  register,
  validateUser,
  login,
  getRefreshToken,
  moralisLogin,
  moralisVerify,
  emailVerified,
  emailVerify,
};
