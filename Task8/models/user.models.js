const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
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
    channels: [{ type: Schema.Types.ObjectId, ref: "user" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  const hashedPassword = await bcrypt.hash(user.password, 10); // await is required here
  this.password = hashedPassword;
});

const User = model("user", userSchema);
module.exports = User;
