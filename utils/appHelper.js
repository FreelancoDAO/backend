const mongoose = require('mongoose');
const path = require('path');
const cacheService = require('./cache');
const { ROLES, cacheKeys } = require('../constants');
const ejs = require('ejs');
const { buildErrObject } = require('../middleware/utils');
const moment = require('moment');

exports.isProductionEnvironment = () => process.env.NODE_ENV === 'production';

exports.isProdServer = () => process.env.PROD_SERVER === 'true';

exports.getRandomNumber = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.convertStringToObjectId = (string) => mongoose.Types.ObjectId(string);

const getFileFormatsFromCache = (mimeType) => {
  let fileFormatsAllowed = [];
  if (mimeType.includes('image/')) {
    fileFormatsAllowed = cacheService.get(
      cacheKeys['ALLOWED_IMAGE_MIME_TYPES']
    );
  } else if (mimeType.includes('audio/')) {
    fileFormatsAllowed = cacheService.get(
      cacheKeys['ALLOWED_AUDIO_MIME_TYPES']
    );
  }
  return fileFormatsAllowed || [];
};

exports.checkIfUploadAllowed = (file, user) => {
  let isValid = true;
  let error = null;

  const isUploadAllowed = cacheService.get(
    cacheKeys['USER_MEDIA_UPLOAD_ALLOWED']
  );

  const fieldsUserAllowedToUpload = cacheService.get(
    cacheKeys.FIELDS_ALLOWED_FOR_USER_TO_UPLOAD
  );

  if (
    user.role === ROLES.USER &&
    !fieldsUserAllowedToUpload?.length &&
    !fieldsUserAllowedToUpload.include(file.fieldname) &&
    !isUploadAllowed
  ) {
    isValid = false;
    error = new Error('File Upload Denied');
    error.code = 403;
  } else {
    const ext = path.extname(file.originalname).split('.')[1].toLowerCase();
    const mimeType = file.mimetype;
    const fileFormatsAllowed = getFileFormatsFromCache(mimeType);
    if (!fileFormatsAllowed.includes(ext)) {
      isValid = false;
      error = new Error('File format not allowed');
      error.code = 403;
    }
  }
  return { isValid, error };
};

exports.parseHTMLFromEJSFile = async (
  fileName,
  data = {},
  overrideDirectorPath = ''
) => {
  if (data && data.constructor.name.toLowerCase() !== 'object') {
    throw buildErrObject(409, global.translate('Incorrect data passed'));
  }
  const dirPath =
    overrideDirectorPath ||
    path.resolve(path.join(__dirname, '../../', 'views'));
  return await ejs.renderFile(`${dirPath}/${fileName}.ejs`, { data });
};

/*
 * Will round off the date to the past 30 minutes slot
 */
exports.roundDataToNearestPast30Mins = (date) => {
  const _date = date instanceof moment ? date.clone() : moment(date);

  _date.set({ minutes: _date.minutes() - (_date.minutes() % 30) });

  return {
    year: _date.year(),
    month: _date.month(),
    date: _date.date(),
    hour: _date.hour(),
    minute: _date.minute(),
    fullDate: _date.format('YYYY-MM-DD HH:mm'),
    time: _date.format('HH:mm'),
    dayOfWeek: _date.day()
  };
};

module.exports.isAdminUser = (user) => user && user.role === ROLES.ADMIN;
