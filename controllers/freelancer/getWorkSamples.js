const Freelancer = require("../../models/freelancer");
const User = require("../../models/user");
const { createItem } = require("../../middleware/db");
const mongoose = require("mongoose");
const { findUserById, generateToken } = require("../auth/helpers");

const getWorkSamples = async (req, res) => {
  res.status(200);
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json(err);
  // }
};

module.exports = { getWorkSamples };
