const { prepareToSendEmail } = require('./prepareToSendEmail');

/**
 * Sends reset password email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendResetPasswordEmailMessage = async (user = {}) => {
  // i18n.setLocale(locale);
  const subject = global.translate('FORGET_PASSWORD_MAIL_SUBJECT');
  const htmlMessage = global.translate('FORGET_PASSWORD_MAIL_BODY', {
    name: user.name,
    url: process.env.FRONTEND_URL,
    urlValue: user.query
      ? `${user.verification}${user.query}`
      : user.verification
  });
  await prepareToSendEmail(user, subject, htmlMessage);
};

module.exports = { sendResetPasswordEmailMessage };
