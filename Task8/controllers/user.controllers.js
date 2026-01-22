const User = require("../models/user.models");
const { createToken } = require("../services/auth.services");
const bcrypt = require("bcrypt");

async function handleUserSignUp(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.send("All fields are required");

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(422).json({ msg: "User already exists" });
  }

  try {
    // const profileURL = ;
    const user = await User.create({
      fullName: fullName,
      email: email,
      password: password,
      profileImage: req?.file?.path || "",
    });

    return res.json({ fullName: user.fullName, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: `Error creating user!` });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json("All fields are required");

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json("User doesn't exist");
  }
  // console.log(user);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Password validity : ", isPasswordValid);

  if (isPasswordValid) {
    const token = createToken(user);

    return res.cookie("token", token).json({ fullName: user.fullName , email:user.email});
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

async function handleFollow(req, res) {
  if (req.params.targetUserId == req.user._id)
    return res.send("Cannot follow own account");
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $addToSet: { channels: req.params.targetUserId } },
    { new: true },
  );

  const channel = await User.findByIdAndUpdate(
    {
      _id: req.params.targetUserId,
    },
    { $addToSet: { followers: user._id } },
    { new: true },
  );

  return res.send(`Followed! ${channel.fullName}`);
}

async function handleUnfollow(req, res) {
  if (req.params.targetUserId == req.user._id)
    return res.send("Cannot unfollow own account");
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $pull: { channels: req.params.targetUserId } },
    { new: true },
  );

  const channel = await User.findByIdAndUpdate(
    {
      _id: req.params.targetUserId,
    },
    { $pull: { followers: user._id } },
    { new: true },
  );

  return res.send(`Unfollowed! ${channel.fullName}`);
}

async function handleGetProfile(req, res) {
  const user = await User.findById(req.params.id);
  console.log({
    name: user.fullName,
    followers: user.followers.length,
    channels: user.channels.length,
  });

  return res.json({
    name: user.fullName,
    followers: user.followers.length,
    channels: user.channels.length,
  });
}
module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleUserLogout,
  handleFollow,
  handleUnfollow,
  handleGetProfile,
};
