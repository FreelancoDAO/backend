const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/utils/verifyToken");

const { addFreelancer, getWorkSamples } = require("../controllers/freelancer");

router.post("/", verifyToken, addFreelancer);
router.get("/getWorkSamples", getWorkSamples);

module.exports = router;
