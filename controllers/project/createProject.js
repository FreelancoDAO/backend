const Project = require("../../models/project");

const createProject = async (
  projectID,
  title,
  description,
  project_target_price,
  project_deadline_date,
  project_minimum_fund_price,
  projectOwner,
  contractAddress
) => {
  const project = await Project.findOne({ contractAddress: contractAddress });
  if (project) {
    console.log(contractAddress + "This project already exists");
    return;
  }
  const new_project = new Project({
    projectID,
    title,
    description,
    project_target_price,
    project_deadline_date,
    project_minimum_fund_price,
    projectOwner,
    contractAddress,
  });

  new_project.save((err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
    }
  });
};

module.exports = { createProject };
