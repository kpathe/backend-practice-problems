const { getUser } = require("../services/user.services");

async function restrictUser(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/user/login");

  const user = getUser(userUid);

  if (!user) return res.redirect("/user/login");

  req.user = user;
  next();
}

async function loggedInUser(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictUser,
  loggedInUser,
};
