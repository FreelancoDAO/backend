const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/utils/verifyToken");
const {
  register,
  validateUser,
  login,
  getRefreshToken,
  moralisLogin,
  moralisVerify,
  emailVerify,
  emailVerified,
} = require("../controllers/auth");

/*
 * Register route
 */
router.post("/register", register);
// router.post("/validateUser", validateUser);
router.get("/login", login);
router.post("/request-message", moralisLogin);
router.post("/verify", moralisVerify);
router.post("/verify-email", verifyToken, emailVerify);
router.get("/:id/verify/:token/", emailVerified);
// router.get("/token", getRefreshToken);

module.exports = router;
