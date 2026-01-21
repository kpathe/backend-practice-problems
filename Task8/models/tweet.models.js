const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true },
);
const Tweet = model("tweet", tweetSchema);
module.exports = Tweet;
