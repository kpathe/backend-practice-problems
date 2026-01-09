const mongoose = require("mongoose");
const urlSchema = mongoose.Schema({
  shortID: {
    type: "string",
    unique: "true",
  },
  redirectURL: {
    type: "string",
    unique: "true",
    required: "true",
  },
  visitHistory: [{ timestamps: { type: "number" } }],
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
