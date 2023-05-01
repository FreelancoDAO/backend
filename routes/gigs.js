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
  findGigById
} = require("../controllers/gig");

router.post("/", verifyToken, createGig);
router.get("/", verifyToken, getAllGigs);
router.get("/:id", findGigById);
router.post("/getGigsByUserId", verifyToken, getGigsByUserId);
router.post("/getGigByCategory", getGigByCategory);
router.get("/popularGigs/all", popularGigs);
router.post("/:id/reviews", verifyToken, updateReviews);

module.exports = router;
