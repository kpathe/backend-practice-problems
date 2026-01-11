const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleUserSignup,
} = require("../controllers/user.controllers");
const {handleRenderLogin,handleRenderSignup}=require("../controllers/renderHTML.controllers")

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.get("/signup", handleRenderSignup);

router.get("/login", handleRenderLogin);

module.exports = router;
