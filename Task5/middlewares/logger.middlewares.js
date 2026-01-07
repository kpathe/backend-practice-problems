const fs = require("fs");

function logger(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()} ${req.method} ${req.path} ${req.ip}`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = logger;
