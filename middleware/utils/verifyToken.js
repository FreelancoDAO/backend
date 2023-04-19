const jwt = require("jsonwebtoken");
const { findItem } = require("../db/getItem");
const User = require("../../models/user");
const { decrypt } = require("../../middleware/auth");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).send("token is not found");
  }
  const token = bearerHeader.split(" ")[1].trim();
  try {
    // const decrypt_token = decrypt(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.data.user._id);
    console.log(user);
    if (user) {
      req.user = user;
      return next();
    }
    res.status(401).send("invalid user");
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = verifyToken;
