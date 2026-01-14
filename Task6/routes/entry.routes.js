const express = require("express");
const router = express.Router();
const {
  handleCreateEntry,
  handleDeleteEntry,
  handleGetEntry,
  handleEditEntry,
} = require("../controllers/entry.controllers");

router.get("/", handleGetEntry);

router.post("/", handleCreateEntry);

router.patch("/", handleEditEntry);

router.delete("/", handleDeleteEntry);
module.exports = router;
