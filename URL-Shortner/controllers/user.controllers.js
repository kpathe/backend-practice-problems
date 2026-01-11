const User = require("../models/user.models");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/user.services");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  return res.json({ msg: "User created", id: user._id });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  });

  if (!user) {
    return res.redirect("/login");
  }

  const uid = uuidv4();
  setUser(uid, user);

  return res.cookie("uid", uid).redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
