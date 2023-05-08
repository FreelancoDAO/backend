const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/utils/verifyToken");
const { getNotification, markRead } = require("../controllers/notification");

router.get("/", verifyToken, getNotification);
router.get("/mark_read/:id", verifyToken, markRead);

module.exports = router;
