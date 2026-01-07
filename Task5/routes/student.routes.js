const express = require("express");
const router = express.Router();

const {
  createNewStudent,
  findStudentsByDept,
  updateStudentSubject,
} = require("../controllers/student.controllers");

router.route("/").get(findStudentsByDept).post(createNewStudent);

router.route("/:id").patch(updateStudentSubject);

module.exports = router;
