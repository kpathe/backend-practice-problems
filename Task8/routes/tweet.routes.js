const express = require("express");
const router = express();
const {
  handleCreateTweet,
  handleGetTweet,
  handleDeleteTweet,
} = require("../controllers/tweet.controllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), handleCreateTweet);
router.get("/:id", handleGetTweet);
router.delete("/:id", handleDeleteTweet);
router.get("/", (req, res) => {
  res.send("ok");
});
module.exports = router;
