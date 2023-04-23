const express = require("express");
const router = express.Router();
const fs = require("fs");
const routesPath = `${__dirname}/`;
const { removeExtensionFromFile } = require("../middleware/utils");

const path = require("path");

// Load Auth route
router.use("/", require("./auth"));
console.log(routesPath);
// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file);
  // Prevents loading of this file and auth file
  return routeFile !== "index" 
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : "";
});

/**
 * Setup routes for static
 */
router.get("/apple-app-site-association", (req, res) => {
  return res.sendFile(
    path.resolve("public", "files", "apple-app-site-association"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});

/*
 * Setup routes for index
 */
router.get("/", (req, res) => {
  res.status(200).send("health check done!!")
});

/*
 * Handle 404 error
 */
router.use("*", (req, res) => {
  res.status(404).json({
    errors: {
      msg: "URL_NOT_FOUND",
    },
  });
});

module.exports = router;
