const { sendEmail } = require('./sendEmail');

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = async (user = {}, subject = '', htmlMessage = '') => {
  user = {
    name: user.name,
    email: user.email,
    verification: user.verification
  };
  const data = {
    user,
    subject,
    htmlMessage
  };
  if (process.env.SENT_MAIL) {
    await sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${user.email}`)
        : console.log(`Email FAILED to: ${user.email}`)
    );
  }
};

module.exports = { prepareToSendEmail };
