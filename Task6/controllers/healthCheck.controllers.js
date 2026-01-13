function healthCheck(req, res) {
  res.send("Everything is ok");
}

module.exports = { healthCheck };
