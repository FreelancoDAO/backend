const { emailExists } = require('./emailExists');
const { emailExistsExcludingMyself } = require('./emailExistsExcludingMyself');
const { prepareToSendEmail } = require('./prepareToSendEmail');
const { sendEmail } = require('./sendEmail');
const {
  sendRegistrationEmailMessage
} = require('./sendRegistrationEmailMessage');
const {
  sendResetPasswordEmailMessage
} = require('./sendResetPasswordEmailMessage');
const {
  sendRegistrationChangePassword
} = require('./sendRegistrationChangePassword');

module.exports = {
  emailExists,
  emailExistsExcludingMyself,
  prepareToSendEmail,
  sendEmail,
  sendRegistrationEmailMessage,
  sendResetPasswordEmailMessage,
  sendRegistrationChangePassword,
}
