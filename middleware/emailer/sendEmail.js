const nodemailer = require('nodemailer');
const domainEmailConfig = require('../../../config/mail');
const AWS = require('aws-sdk');
const { isProdServer } = require('../../utils');

// const mg = require('nodemailer-mailgun-transport');

/**
 * Sends email
 * @param {Object} data - data
 * @param {Fucntion} callback - callback
 * @param {boolean} throwErrOnFailure - throw error if email failed to send
 */
const sendEmail = async (data = {}, callback, throwErrOnFailure = false) => {
  try {
    if (
      !process.env.EMAIL_FROM_DOMAIN ||
      !Object.keys(domainEmailConfig).includes(process.env.EMAIL_FROM_DOMAIN)
    ) {
      console.error('Mail domain not found');
      process.exit(1);
    }
    const auth = {
      ...(isProdServer()
        ? {
            SES: new AWS.SES({ apiVersion: '2010-12-01' })
          }
        : {
            ...domainEmailConfig[process.env.EMAIL_FROM_DOMAIN],
            auth: {
              // eslint-disable-next-line camelcase
              user: process.env.EMAIL_FROM_ADDRESS,
              pass: process.env.EMAIL_FROM_PASSWORD
            }
          })
    };
    // const transporter = nodemailer.createTransport(mg(auth));
    const transporter = nodemailer.createTransport(auth);

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

module.exports = { sendEmail };
