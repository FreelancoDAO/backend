const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const User = require("../../models/user");
const {
  generateToken,
  getUserIdFromToken,
  findUserById,
} = require("./helpers");

const emailVerify = async (req, res) => {
  const user_id = req.user._id;
  await User.findByIdAndUpdate(user_id, { email: req.body.email });
  const email_token = generateToken(user_id);
  const url = `${process.env.BASE_URL}/auth/${user_id}/verify/${email_token}`;

  // send verification email to user
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tiwarilalit2601@gmail.com",
      pass: "wfdpsmxngnxefswv",
    },
  });

  const template = await ejs.renderFile(
    path.resolve(path.join(__dirname, "../../", "views", "verifyEmail.ejs")),
    {
      url: url,
    }
  );

  const mailOptions = {
    from: "freelanco.support@gmail.com",
    to: req.body.email,
    subject: "Verify your email address",
    html: template,
  };
  res.status(201).send({ message: "Verification email sent" });
  await transporter.sendMail(mailOptions);
};

module.exports = { emailVerify };
