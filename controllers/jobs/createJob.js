const Job = require("../../models/job");
const { createItem } = require("../../middleware/db");

const createJob = async (req, res) => {
  try {
    res.status(201).json(await createItem(req.body, Job));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createJob };
