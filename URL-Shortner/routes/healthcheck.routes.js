const healthcheck = require("../controllers/healthcheck.controllers");
const express = require("express");
const router = express.Router();

router.get("/", healthcheck);

module.exports = router;
