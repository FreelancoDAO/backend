const { createProposal } = require("./createProposal");
const { getProposalByStatus } = require("./getProposalByStatus");
const { updateStatus } = require("./updateStatus");
const { getProposalOfDao } = require("./getProposalOfDao");
const { getTreasuryOfDao } = require("./getTreasuryOfDao");
const { getOrders } = require("./getOrders");
const { sentProposalUpdateOverMail } = require("./sentProposalUpdateOverMail");

module.exports = {
  createProposal,
  getProposalByStatus,
  updateStatus,
  getProposalOfDao,
  getTreasuryOfDao,
  getOrders,
  sentProposalUpdateOverMail
};
