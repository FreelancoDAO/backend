const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/utils/verifyToken");
const { getNotification } = require("../controllers/notification");

router.get("/", verifyToken, getNotification);

module.exports = router;
