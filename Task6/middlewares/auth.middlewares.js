const { getUser } = require("../services/auth.services");

function requireAuth(req, res, next) {
  const tokenCookie = req.cookies?.token;

  // console.log(req.user);
  if (!tokenCookie) {
    return res.redirect("/user/login");
  }

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  // console.log(req.user);

  next();
}

module.exports = {
  requireAuth,
};
