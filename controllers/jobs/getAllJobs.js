const { getItems } = require("../../middleware/db/");
const Job = require("../../models/job");

const getAllJobs = async (req, res) => {
  try {
    console.log("data");
    const allJobs = await Job.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "company_posted",
          foreignField: "_id",
          as: "userData",
        },
      },
    ]);
    console.log(allJobs);
    res.status(200).json(allJobs);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllJobs };
