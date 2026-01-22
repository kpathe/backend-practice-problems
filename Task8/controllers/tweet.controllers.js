const Tweet = require("../models/tweet.models");

async function handleCreateTweet(req, res) {
  const { content } = req.body;

  if (!content && !req.file)
    return res.status(400).json("Content/image is required");

  const tweet = await Tweet.create({
    content: content,
    imageURL: req?.file?.path || "",
    createdBy: req.user._id,
  });

  return res.status(201).json(tweet);
}
async function handleGetTweet(req, res) {
  const tweet = await Tweet.findById(req.params.id).populate("createdBy");
  const tweetObj = {
    content: tweet.content,
    image: tweet.imageURL,
    author: tweet.createdBy.fullName,
    authorAvatar: tweet.createdBy.profileImage,
  };
  return res.status(200).json(tweetObj);
}
async function handleDeleteTweet(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  console.log(tweet?.createdBy);

  console.log(req.user._id);

  if (String(tweet?.createdBy) == req.user._id) {
    return res.status(201).json({ msg: "Tweet Deleted!", tweet: tweet });
  }

  return res.status(403).json("Forbidden");
}

async function handleLikeTweet(req, res) {
  if (!req.params.tweetId)
    return res.status(400).json("Please provide tweet id");
  const tweet = await Tweet.findByIdAndUpdate(
    { _id: req.params.tweetId },
    [
      {
        $set: {
          isLiked: { $in: [req.user._id, "$likes"] },
        },
      },
      {
        $set: {
          likes: {
            $cond: [
              "$isLiked",
              { $setDifference: ["$likes", [req.user._id]] },
              { $concatArrays: ["$likes", [req.user._id]] },
            ],
          },
        },
      },
      {
        $unset: "isLiked",
      },
    ],
    { new: true, updatePipeline: true },
  );

  if (!tweet) return res.status(404).json("Tweet not found");
  return res.json(tweet.likes.length);
}

module.exports = {
  handleCreateTweet,
  handleGetTweet,
  handleDeleteTweet,
  handleLikeTweet,
};
