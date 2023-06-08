const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/utils/verifyToken");
const {
  createProposal,
  getProposalByStatus,
  updateStatus,
  getProposalOfDao,
  getTreasuryOfDao,
  getOrders,
  gptResponse,
} = require("../controllers/proposal");

router.post("/", verifyToken, createProposal);
router.post("/getProposalByStatus", verifyToken, getProposalByStatus);
router.put("/:proposalId/:status", verifyToken, updateStatus);
router.get("/getProposalsOfClient", verifyToken, getProposalByStatus);
router.get("/getProposolsOfDao", getProposalOfDao);
router.get("/getDaoTreasury", getTreasuryOfDao);
router.get("/getOrders", verifyToken, getOrders);
router.post("/gptResponse", gptResponse);

module.exports = router;
