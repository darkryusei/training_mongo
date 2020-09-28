const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.ObjectId,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "user",
  }
);

module.exports = User = mongoose.model("user", userSchema);
