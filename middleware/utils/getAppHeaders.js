const { supportedLanguagesInApp } = require('../../constants');

const getAppHeaders = (req, res, next) => {
  let lang =
    req.clientDeviceLanguage ||
    supportedLanguagesInApp[req.get('Accept-Language')];
  if (!lang) {
    lang = supportedLanguagesInApp.English;
  }
  global.setLocale(lang);
  return next();
};

module.exports = {
  getAppHeaders
};
