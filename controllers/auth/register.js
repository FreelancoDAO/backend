const { registerUser } = require("./helpers");
const User = require("../../models/user");
const { createItem } = require("../../middleware/db");
const { generateToken } = require("./helpers");

const register = async (req, res) => {
  try {
    let user = await User.findOne(
        { email: req.body.email },  
    );
    // let email = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log(req.body);
      const user = await createItem(req.body, User);
      res.status(201).json({
        token: generateToken(user._id),
      });
    } else {
      res.status(403).send({
        error:
          "User already exists ! please sign up with different wallet or email",
      });
    }
  } catch (err) {
    res.send({ error: err });
  }
};

module.exports = { register };
