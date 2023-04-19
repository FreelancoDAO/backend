const { getProfile, editProfile } = require("../controllers/profile");
const { getRefreshToken } = require("../controllers/auth");

const express = require("express");
const router = express.Router();

router.get("/", getRefreshToken);
router.put("/:id", editProfile);
router.get("/:id", getProfile)


module.exports = router;
