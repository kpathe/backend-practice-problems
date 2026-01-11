const mongoose = require("mongoose");
const urlSchema = mongoose.Schema(
  {
    shortID: {
      type: String,
      unique: true,
    },
    redirectURL: {
      type: String,
    },
    visitHistory: [{ timestamps: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
