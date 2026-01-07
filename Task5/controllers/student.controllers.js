const Student = require("../models/students.models");

const createNewStudent = async (req, res) => {
  try {
    const body = req.body;
    const subString = body.subjects;
    console.log(subString);
    const subArray = subString.split(",").map((s) => s.trim());
    console.log(subArray);
    const student = await Student.create({
      name: body.name,
      rollnum: body.rollnum,
      department: body.department,
      subjects: subArray,
    });

    return res.status(201).json({ msg: "Created student", id: student._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const findStudentsByDept = async (req, res) => {
  try {
    const dept = req.query.department;
    // console.log(dept);
    const students = await Student.find({ department: dept });
    // console.log(students);

    if (students.length === 0) {
      return res.status(404).json({ msg: "Not found" });
    }
    return res.status(200).json({ msg: "Found!", students });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
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
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createNewStudent,
  findStudentsByDept,
  updateStudentSubject,
};
