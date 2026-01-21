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

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

router.post("/follow/:targetUserId", verifyJWT, handleFollow);
router.post("/unfollow/:targetUserId", verifyJWT, handleUnfollow);
router.get("/profile/:id", verifyJWT, handleGetProfile);

module.exports = router;
