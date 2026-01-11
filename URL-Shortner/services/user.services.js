const usersID = new Map();

function setUser(uid, user) {
  usersID.set(uid, user);
}

function getUser(uid) {
  return usersID.get(uid);
}

module.exports = {
  setUser,
  getUser,
};
