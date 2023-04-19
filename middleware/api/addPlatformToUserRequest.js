// const _ = require('lodash');
// const { updateUserInfo } = require('../../controllers/auth/helpers');
// const { getBrowserInfo, getDeviceType } = require('../utils');
// const { buildErrObject } = require('../utils');
// const { ROLES } = require('../../constants');

/**
 * Add User Details handler to Add Some Properties to User's Request
 */
const addPlatformToUserRequest = async (req, _1, next) => {
  // try {
  //   const userData = req?.user;
  //   if (!_.isEmpty(userData) && userData.role === ROLES.USER) {
  //     if (!userData?.platform) {
  //       const deviceInfo = getBrowserInfo(req);
  //       const platform = getDeviceType(deviceInfo);
  //       const dataToUpdate = { platform };
  //       updateUserInfo({ _id: userData._id }, dataToUpdate);
  //     }
  //   }
  //   return next();
  // } catch (error) {
  //   console.log(error);
  //   throw buildErrObject(500, global.translate('Something Went Wrong'));
  // }
};

module.exports = { addPlatformToUserRequest };
