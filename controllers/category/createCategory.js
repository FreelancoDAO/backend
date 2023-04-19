const Category = require("../../models/category");
const { createItem } = require("../../middleware/db");

const createCategory = async (req, res) => {
  console.log(req.body);
  try {
    const category = await createItem(req.body, Category);
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { createCategory };
