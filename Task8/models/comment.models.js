const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  tweetId: { type: Schema.Types.ObjectId, ref: "tweet" },
  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});
const Comment = model("comment", commentSchema);
module.exports = Comment;
