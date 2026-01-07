const Student = require("../models/students.models");

const createNewStudent = async (req, res) => {
  try {
    const body = req.body;
    const student = await Student.create({
      name: body.name,
      rollnum: body.rollnum,
      department: body.department,
      subjects: body.subjects,
    });

    return res.status(201).json({ msg: "Created student", id: student._id });
  } catch (error) {
    console.log(error);
  }
};

const findStudentsByDept = async (req, res) => {
  try {
    const dept = req.body.department;
    // console.log(dept);
    const students = await Student.find({ department: dept });
    // console.log(students);

    if (students.length === 0) {
      return res.status(404).json({ msg: "Not found" });
    }
    return res.status(200).json({ msg: "Found!", students });
  } catch (error) {
    console.log(error);
  }
};

const updateStudentSubject = async (req, res) => {
  try {
    const sub = req.body.subject;
    // console.log(sub);

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $push: { subjects: sub } },
      { new: true }
    );

    return res.status(200).json({ msg: "Added subject", id: student._id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewStudent,
  findStudentsByDept,
  updateStudentSubject,
};
