const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign({ id: user._id, email: user.email }, jwtsecret);
}

function getUser(token) {
  const user = jwt.verify(token, jwtsecret);

  return user;
}

module.exports = { setUser, getUser };
