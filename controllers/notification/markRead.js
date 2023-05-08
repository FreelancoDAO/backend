const Notification = require("../../models/notification");

const markRead = async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndUpdate(id, { read: true });
  res.status(200).json({ status: "success" });
}

module.exports = { markRead }