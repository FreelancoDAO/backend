const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
  wallet_address: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    wallet_address: {
      type: String,
      // unique: true,
      // required: true,
    },
    profileId: {
      type: String,
      // unique: true,
      // required: true,
    },
    description: {
      type: String,
    },
    socket_id: {
      type: String,
    },
    reviews: {
      type: [reviewSchema],
    },
    rating: {
      type: Number,
      default: 0.0,
    },
    freelancer_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancer",
    },
    company_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    metamask_verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// const hash = (user, salt, next) => {
//   bcrypt.hash(user.password, salt, (error, newHash) => {
//     if (error) {
//       return next(error);
//     }
//     user.password = newHash;
//     return next();
//   });
// };

// const genSalt = (user, SALT_FACTOR, next) => {
//   bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     return hash(user, salt, next);
//   });
// };

// userSchema.pre("save", function (next) {
//   const that = this;
//   const SALT_FACTOR = 5;
//   if (!that.isModified("password")) {
//     return next();
//   }
//   return genSalt(that, SALT_FACTOR, next);
// });

// userSchema.methods.comparePassword = function (passwordAttempt, cb) {
//   bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
//     err ? cb(err) : cb(null, isMatch)
//   );
// };

module.exports = mongoose.model("User", userSchema);
