const Tweet = require("../models/tweet.models");
const User = require("../models/user.models");
const mongoose = require("mongoose");

async function handleGetFeed(req, res) {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  const channelIds = user.channels;

  console.log(channelIds);

  const feed = await Tweet.aggregate([
    {
      $match: {
        createdBy: { $in: channelIds },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $project: {
        content: 1,
        imageURL: 1,
        createdAt: 1,
        author: {
          _id: "$authorDetails._id",
          name: "$authorDetails.fullName",
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  console.log(feed);
  res.send(feed);
}

module.exports = handleGetFeed;
