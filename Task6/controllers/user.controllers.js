const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const { setUser } = require("../services/auth.services");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ msg: "All fields are required" });
  }
  const existingUser = await User.findOne({ email: email });

  if (email == existingUser?.email) {
    return res.redirect("login");
  }

  const passwordEncrypt = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: passwordEncrypt,
  });

  res.redirect("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.send("Invalid password");
  }

  const token = setUser(user);

  return res.cookie("token", token).redirect("/diary");
}

async function handleUserLogout(req, res) {
  res.clearCookie("token").json("User logged out");
}
module.exports = { handleUserLogin, handleUserSignup, handleUserLogout };
