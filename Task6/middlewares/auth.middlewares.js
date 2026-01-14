const { getUser } = require("../services/auth.services");

function requireAuth(req, res, next) {
  const tokenCookie = req.cookies?.token;

  console.log(req.user);
  if (!tokenCookie) {
    return res.json("Please login");
  }

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  requireAuth,
};
