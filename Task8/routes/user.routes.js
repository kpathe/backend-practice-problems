const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
