const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Entry = mongoose.model("entry", entrySchema);

module.exports = Entry;
