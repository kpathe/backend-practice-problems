const express = require("express");
const app = express();
const logger = require("./middlewares/logger.middlewares");
const studentRouter = require("./routes/student.routes.js");
const { connectDB } = require("./db/index.js");
const PORT = 8000;

connectDB("mongodb://localhost:27017/student-management").then(() => {
  console.log("MongoDB connected!");
});

app.use(express.urlencoded({ extended: false }));
app.use(logger("log.txt"));

app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log("Server started at PORT : ", PORT);
});
