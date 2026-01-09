const express = require("express");
const {
  handleRedirectURL,
  handleGenerateShortURL,
  handleURLanalytics,
} = require("../controllers/url.controllers");
const router = express.Router();

router.get("/:shortID", handleRedirectURL);

router.post("/", handleGenerateShortURL);

router.get("/analytics/:shortID", handleURLanalytics);

module.exports = router