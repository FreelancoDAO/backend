const Notification = require("../../models/notification");
const { createItem } = require("../../middleware/db");


const addNotification = async (notification) => {
  const noti = await createItem(notification, Notification);
  if (noti)
    console.log("notification saved successfully");
}

module.exports = { addNotification };