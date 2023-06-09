const express = require("express");
const { route } = require("./gigs");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/category");

router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;
