const mongoose = require("mongoose");
const urlSchema = mongoose.Schema(
  {
    shortID: {
      type: "string",
      unique: "true",
    },
    redirectURL: {
      type: "string",
      unique: "true",
    },
    visitHistory: [{ timestamps: { type: "number" } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
