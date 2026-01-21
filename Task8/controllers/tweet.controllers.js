const Tweet = require("../models/tweet.models");

async function handleCreateTweet(req, res) {
  const { content } = req.body;
  if (!content) return res.send("Content is required");

  console.log(req.user);

  const tweet = await Tweet.create({
    content: content,
    imageURL: req.file.path,
    createdBy: req.user._id,
  });

  return res.json(tweet);
}
async function handleGetTweet(req, res) {
  const tweet = await Tweet.findById(req.params.id).populate("createdBy");
  const tweetObj = {
    content: tweet.content,
    image: tweet.imageURL,
    author: tweet.createdBy.fullName,
    authorAvatar: tweet.createdBy.email,
  };
  return res.json(tweetObj);
}
async function handleDeleteTweet(req, res) {
  const deletedTweet = await Tweet.findByIdAndDelete(req.params.id);
  return res.json(deletedTweet);
}

module.exports = {
  handleCreateTweet,
  handleGetTweet,
  handleDeleteTweet,
};
