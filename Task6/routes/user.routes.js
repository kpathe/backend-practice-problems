const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleUserSignup,
  handleUserLogout,
} = require("../controllers/user.controllers");

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.post("/logout", handleUserLogout);

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
