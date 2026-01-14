const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleUserSignup,
} = require("../controllers/user.controllers");

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.get("/login", (req, res) => {
  res.json({ msg: "User already exists.Please sign in" });
});

module.exports = router;
