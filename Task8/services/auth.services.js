const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

function createToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
      fullName: user.fullName,
    },
    jwtsecret,
  );

  return token;
}

function getUser(token) {
  const user = jwt.verify(token, jwtsecret);
  return user;
}

module.exports = {
  createToken,
  getUser,
};
