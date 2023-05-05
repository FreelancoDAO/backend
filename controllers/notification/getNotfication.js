const Notification = require("../../models/notification");

const getNotification = async (req, res) => {

  Notification.find({ wallet_address: req.user?.wallet_address })
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, notifications) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(notifications);
      }
    });

}

module.exports = { getNotification }