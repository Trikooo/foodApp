const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    salt: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    admin: {
        type: Boolean, 
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
