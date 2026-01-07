const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollnum: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    subjects: [{ type: String }],
  },
  { timestamps: true }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
