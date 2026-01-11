const express = require("express");
const router = express.Router();
const {
  handleRenderHTML,
  handleRenderSignup,
  handleRenderLogin,
} = require("../controllers/renderHTML.controllers");

router.get("/", handleRenderHTML);



module.exports = router;
