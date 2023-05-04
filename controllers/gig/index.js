const { createGig } = require("./createGig");
const { getAllGigs } = require("./getAllGigs");
const { getGigsByUserId } = require("./getGigsByUserId");
const { getGigByCategory } = require("./getGigByCategory");
const { popularGigs } = require("./popularGigs");
const { updateGig } = require("./updataGig");
const { updateReviews } = require("./updateReviews");
const { findGigById } = require("./findGigById");
const { getGigsBySearch } = require("./getGigsBySearch");

module.exports = {
  createGig,
  getAllGigs,
  getGigsByUserId,
  getGigByCategory,
  popularGigs,
  updateGig,
  updateReviews,
  findGigById,
  getGigsBySearch,
};
