const express = require("express");
const router = express.Router();
const renderHTML = require("../controllers/renderHTML.controllers");

router.get("/", renderHTML);

module.exports = router;
