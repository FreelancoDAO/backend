
const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");


/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = async (user = {}, subject = '', htmlMessage = '') => {
  user = {
    name: user.name,
    email: user.email
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

const sendEmail = async (data = {}, callback, throwErrOnFailure = false) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: Array.isArray(data?.user?.email)
        ? data.user.email
        : `${data.user.name} <${data.user.email}>`,
      ...(data?.cc && { cc: data.cc }),
      subject: data.subject,
      html: data.htmlMessage
    };
    if (data?.cc?.length) {
      mailOptions.cc = data.cc;
    }
    if (callback && typeof callback === 'function') {
      transporter.sendMail(mailOptions, (err) => {
        if (callback) {
          if (err) {
            console.log(err);
            return callback(false);
          }
          return callback(true);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            if (throwErrOnFailure) {
              return reject(err);
            } else {
              return resolve(false);
            }
          }
          return resolve(true);
        });
      });
    }

  } catch (error) {
    console.log('Error sending email - ', error);
  }
};


/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendJoiningStatus = async (user = {}) => {
  console.log(user);

  const subject = "Thanks for joining us as a freelancer!";
  const htmlMessage = await ejs.renderFile(
    path.resolve(
      path.join(
        __dirname,
        '../',
        'views',
        'verifyEmail.ejs'
      )
    ),
    {
      name: user.name,
    }
  );
  await prepareToSendEmail(user, subject, htmlMessage);
};


/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const newMessage = async (user = {}) => {
  console.log(user);

  const subject = "You Just Received a New Message !";
  const htmlMessage = await ejs.renderFile(
    path.resolve(
      path.join(
        __dirname,
        '../',
        'views',
        'newMessage.ejs'
      )
    ),
    {
      name: user?.name,
      client: user?.client,
      message: user?.message

    }
  );
  await prepareToSendEmail(user, subject, htmlMessage);
};


const proposalMail = async (user = {}, subject, message) => {
  console.log(user);

  const htmlMessage = await ejs.renderFile(
    path.resolve(
      path.join(
        __dirname,
        '../',
        'views',
        'proposal.ejs'
      )
    ),
    {
      name: user?.name,
      message: message
    }
  );
  await prepareToSendEmail(user, subject, htmlMessage);
};


// /**
//  * Sends reset password email
//  * @param {string} locale - locale
//  * @param {Object} user - user object
//  */
// const sendResetPasswordEmailMessage = async (user = {}) => {
//   const subject = 'Reset your password at Botifier'
//   const url = `${process.env.FRONTEND_URL}/resetPassword?token=${user?.verificationCode}`;
//   const htmlMessage = await ejs.renderFile(
//     path.resolve(
//       path.join(
//         __dirname,
//         '../',
//         'views',
//         'forgetPassword.ejs'
//       )
//     ),
//     {
//       name: user?.firstName,
//       url: url
//     }
//   );
//   await prepareToSendEmail(user, subject, htmlMessage);
// };




module.exports = {
  prepareToSendEmail, sendEmail, sendJoiningStatus, newMessage, proposalMail
  // sendRegistrationEmailMessage, sendResetPasswordEmailMessage 
};
