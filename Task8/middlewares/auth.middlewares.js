const { getUser } = require("../services/auth.services");

function verifyJWT(req, res, next) {
  token = req.cookies?.token;
  
  if(!token) return res.send("You are not authenticated!")
  const user = getUser(token);
  if (!user) return res.send("Forbidden");

  req.user = user;
  return next();
}

module.exports = verifyJWT;
