const { getProfile, editProfile } = require("../controllers/profile");
const { getFullProfile } = require("../controllers/auth");
const verifyToken = require("../middleware/utils/verifyToken");

const express = require("express");
const router = express.Router();

router.get("/", verifyToken, getFullProfile);
router.put("/:id", editProfile);
router.get("/:id", getProfile)


module.exports = router;
