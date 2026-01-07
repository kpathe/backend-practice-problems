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
    const dept = req.params;
    const students = await Student.find({ department: dept });

    return res.status(200).json({ msg: "Found!", students });
  } catch (error) {
    console.log(error);
  }
};

const updateStudentSubject = async (req, res) => {
  try {
    const sub = req.body.subject;
    const student = await Student.findByIdAndUpdate(req.params.id, {
      subjects: subjects.push(sub),
    });

    return res.status(200).json({ msg: "Added subject", id: student._id });
  } catch (error) {
    console.log(error);
  }
};
