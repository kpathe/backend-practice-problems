const mongoose = require("mongoose");
function connectDB(url) {
  try {
    mongoose.connect(url).then(() => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    throw error;
  }
}

module.exports = connectDB;
