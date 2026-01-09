const mongoose = require("mongoose");

async function connectToDB(url) {
  mongoose.connect(url);
}

module.exports = connectToDB;
