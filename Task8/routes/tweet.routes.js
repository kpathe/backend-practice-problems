const express = require("express");
const router = express();
const {
  handleCreateTweet,
  handleGetTweet,
  handleDeleteTweet,
  handleLikeTweet,
} = require("../controllers/tweet.controllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), handleCreateTweet);
router.get("/:id", handleGetTweet);
router.delete("/:id", handleDeleteTweet);

router.post("/:tweetId/like",handleLikeTweet)

module.exports = router;
