const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const { setUser } = require("../services/auth.services");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (email == existingUser.email) {
    return res.redirect("login");
  }

  if (!name || !email || !password) {
    return res.json({ msg: "All fields are required" });
  }

  const passwordEncrypt = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: passwordEncrypt,
  });

  res.json({ msg: "User created !" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.send("Invalid password");
  }

  const token = setUser(user);

  return res.cookie("token", token).json({ msg: "Logged in" });
}

module.exports = { handleUserLogin, handleUserSignup };
