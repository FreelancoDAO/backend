const { buildErrObject } = require('./buildErrObject');
const { buildSuccObject } = require('./buildSuccObject');
const { deleteTempFile, deleteFilesFromDisk } = require('./deleteTempFile');
const { getAppHeaders } = require('./getAppHeaders');
const { getBrowserInfo } = require('./getBrowserInfo');
const { getCountry } = require('./getCountry');
const { handleError } = require('./handleError');
const { isIDGood, isObjectId } = require('./isIDGood');
const { itemNotFound } = require('./itemNotFound');
const { removeExtensionFromFile } = require('./removeExtensionFromFile');
const { validateId } = require('./validateId');
const { validateResult } = require('./validateResult');
const { getDeviceType } = require('./getDeviceType');

module.exports = {
  buildErrObject,
  buildSuccObject,
  deleteTempFile,
  getAppHeaders,
  getBrowserInfo,
  getCountry,
  handleError,
  isIDGood,
  itemNotFound,
  removeExtensionFromFile,
  validateId,
  validateResult,
  deleteFilesFromDisk,
  isObjectId,
  getDeviceType
};
