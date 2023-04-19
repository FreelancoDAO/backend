const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/utils/verifyToken");

const {
  createGig,
  getAllGigs,
  getGigsByUserId,
  getGigByCategory,
  popularGigs,
  updateReviews,
} = require("../controllers/gig");

router.post("/", verifyToken, createGig);
router.get("/", verifyToken, getAllGigs);
router.get("/getGigsByUserId", verifyToken, getGigsByUserId);
router.post("/getGigByCategory", getGigByCategory);
router.get("/popularGigs", popularGigs);
router.post("/:id/reviews", verifyToken, updateReviews);

module.exports = router;
