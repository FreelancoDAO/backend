const Category = require("../../models/category");
const { getItems } = require("../../middleware/db");

const getAllCategories = async (req, res) => {
  console.log(req.body);
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { getAllCategories };
