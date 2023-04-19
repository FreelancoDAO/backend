const _ = require("lodash");
const { COLORS } = require("../../constants");
// const { isProductionEnvironment } = require('../../utils');

/**
 * print request data
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.printRequestData = (req, res, next) => {
  res.on("finish", () => {
    // const time = isProductionEnvironment()
    //   ? new Date().toUTCString()
    //   : new Date().toLocaleString();
    const time = true;
    const requestedUrl = req.originalUrl;
    const userId = req.user?._id || "";
    const email = req.user?.email || "";
    if (true) {
      console.log(
        `[${time}] : ${req.method.toUpperCase()} : Status ${
          res.statusCode
        } :  User ID ${userId} Email - ${email} - for endpoint ${requestedUrl} ${
          !_.isEmpty(req.body) ||
          !_.isEmpty(req.params) ||
          !_.isEmpty(req.query)
            ? `Request Body - ${JSON.stringify(
                req.body
              )}, Request Params - ${JSON.stringify(
                req.params
              )}, Request Query - ${JSON.stringify(req.query)}`
            : ""
        }`
      );
    } else {
      console.log(
        `[${time}] : ${req.method.toUpperCase()} : Status ${COLORS.fgYellow}${
          res.statusCode
        }${COLORS.reset} :  User ID ${COLORS.fgRed}${userId} ${
          COLORS.reset
        } - Email - ${COLORS.fgRed}${email}${
          COLORS.reset
        } for endpoint ${requestedUrl} ${
          !_.isEmpty(req.body) ||
          !_.isEmpty(req.params) ||
          !_.isEmpty(req.query)
            ? `Request Body - ${JSON.stringify(
                req.body
              )}, Request Params - ${JSON.stringify(
                req.params
              )}, Request Query - ${JSON.stringify(req.query)}`
            : ""
        }`
      );
    }
  });
  next();
};
