const { prepareToSendEmail } = require('./prepareToSendEmail');

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendRegistrationEmailMessage = async (user = {}) => {
  // i18n.setLocale(locale);
  const subject = global.translate('REGISTRATION_MAIL_SUBJECT');
  const htmlMessage = global.translate(
    'REGISTRATION_MAIL_BODY',
    {
      name: user.name,
      url: process.env.BACKEND_URL,
      urlValue: user.verification
    }
  );
  await prepareToSendEmail(user, subject, htmlMessage);
};

module.exports = { sendRegistrationEmailMessage };
