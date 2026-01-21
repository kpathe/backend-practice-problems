const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscriptions: [{ subscription: Schema.Types.ObjectId, ref: "user" }],
    followers: [{ follower: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true },
);

const User = model("user", userSchema);
module.exports = User;
