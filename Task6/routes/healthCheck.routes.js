const express = require("express");
const router = express.Router();
const {healthCheck} = require("../controllers/healthCheck.controllers")

router.get("/healthcheck", healthCheck);

module.exports = router;
