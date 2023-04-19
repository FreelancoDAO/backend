const Project = require("../../models/project");

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    if (allProjects.length) {
      return res.status(200).send(allProjects);
    } else {
      return res.status(404).send("No project found");
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getAllProjects };
