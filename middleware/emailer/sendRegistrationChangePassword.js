const i18n = require('i18n')
const { prepareToSendEmail } = require('./prepareToSendEmail')

/**
 * Sends registration change password email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendRegistrationChangePassword = async (user = {}) => {
  // i18n.setLocale(locale)
  const subject = global.translate('REGISTRATION_CHANGE_PASSWORD_MAIL_SUBJECT')
  const htmlMessage = global.translate(
    'REGISTRATION_CHANGE_PASSWORD_MAIL_BODY',
    {
      name: user.name,
      url: process.env.FRONTEND_URL,
      urlValue: user.verificationPassword
    }
  )
  await prepareToSendEmail(user, subject, htmlMessage)
}

module.exports = { sendRegistrationChangePassword }
