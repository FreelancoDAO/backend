// const _ = require('lodash');
// const { ROLES } = require('../../constants');
// const { updateUserInfo } = require('../../controllers/auth/helpers');
// const { updateDeviceTrackingInfo } = require('../../controllers/auth/helpers');

// const { buildErrObject } = require('../utils');

/**
 * Add User Details handler to Add Some Properties to User's Request
 */
const addUserDetailsToUsersRequest = async (req, _1, next) => {
  // try {
  //   const userData = req.user;
  //   if (_.isEmpty(userData) || userData.role === ROLES.USER) {
  //     const {
  //       clientTimezone,
  //       clientTimezoneOffset,
  //       clientDeviceLanguage,
  //       clientDeviceId
  //     } = req;
  //     if (clientTimezone && clientDeviceLanguage) {
  //       const dataToUpdate = {
  //         timezone: clientTimezone,
  //         timezoneOffset: clientTimezoneOffset,
  //         deviceLanguage: clientDeviceLanguage
  //       };
  //       if (userData?.role === ROLES.USER) {
  //         // eslint-disable-next-line max-depth
  //         if (
  //           !userData.timezone ||
  //           !userData.deviceLanguage ||
  //           userData.timezone !== clientTimezone ||
  //           userData.deviceLanguage !== clientDeviceLanguage
  //         ) {
  //           await updateUserInfo({ _id: userData._id }, dataToUpdate);
  //           req.user = Object.assign(
  //             {},
  //             req.user?.toObject ? req.user.toObject() : req.user,
  //             dataToUpdate
  //           );
  //         }
  //       } else {
  //         await updateDeviceTrackingInfo({ clientDeviceId }, dataToUpdate);
  //       }
  //     }
  //   }
  //   return next();
  // } catch (error) {
  //   console.log(error);
  //   throw buildErrObject(500, global.translate('Something Went Wrong'));
  // }
};

module.exports = { addUserDetailsToUsersRequest };
