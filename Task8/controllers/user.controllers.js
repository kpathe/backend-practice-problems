const User = require("../models/user.models");
const { createToken } = require("../services/auth.services");
const bcrypt = require("bcrypt");

async function handleUserSignUp(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.send("All fields are required");

  try {
    const user = await User.create({
      fullName: fullName,
      email: email,
      password: password,
    });

    return res.json({ fullName: user.fullName, email: user.email });
  } catch (error) {
    return res.json({ msg: `Error creating user!`, error: error });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.send("All fields are required");

  const user = await User.findOne({ email: email });
  console.log(user);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Password validity : ", isPasswordValid);

  if (isPasswordValid) {
    const token = createToken(user);

    return res.cookie("token", token).json({ fullName: user.fullName });
  }
}

async function handleUserLogout(req, res) {
  try {
    res.clearCookie("token").json({ msg: "User logged out" });
  } catch (error) {
    console.log(error);
    res.send("Error logging out user");
  }
}
module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleUserLogout,
};
