const express = require("express");
const verifyJWT = require("../middlewares/auth.middlewares");
const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
  handleFollow,
  handleUnfollow,
  handleGetProfile,
} = require("../controllers/user.controllers");
const router = express.Router();

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

router.post("/signup",upload.single("profileImage"), handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

router.post("/follow/:targetUserId", verifyJWT, handleFollow);
router.post("/unfollow/:targetUserId", verifyJWT, handleUnfollow);
router.get("/profile/:id", verifyJWT, handleGetProfile);

module.exports = router;
