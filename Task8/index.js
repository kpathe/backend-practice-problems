require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const User = require("./models/user.models");
const bcrypt = require("bcrypt");
const userRouter = require("./routes/user.routes");
const app = express();
const PORT = process.env.PORT || 8000;
const mongodbURI = process.env.MONGODB_URI;

connectDB(mongodbURI);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT : ${PORT}`);
});
