const { supportedLanguagesInApp } = require('../../constants');

/**
 * Parse User Details handler from Request Headers
 */
const parseUserDetailsFromHeaders = (req, _, next) => {
  const clientTimezone = req.headers.clienttimezone;
  const clientTimezoneOffset = req.headers.clienttimezoneoffset;
  const clientDeviceLanguage = req.headers.clientdevicelanguage;
  const clientDeviceId = req.headers.clientdeviceid;

  if (clientTimezone) {
    req.clientTimezone = clientTimezone;
  }
  if (clientTimezoneOffset) {
    req.clientTimezoneOffset = clientTimezoneOffset;
  }
  if (clientDeviceId) {
    req.clientDeviceId = clientDeviceId;
  }
  if (clientDeviceLanguage && clientDeviceLanguage !== 'undefined') {
    req.clientDeviceLanguage =
      supportedLanguagesInApp[clientDeviceLanguage] ||
      supportedLanguagesInApp.English;
  }
  next();
};

module.exports = { parseUserDetailsFromHeaders };
