const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const User = require("./models/user.models");
const mongoose = require("mongoose");
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose.connect("mongodb://localhost:27017/profile-picture").then(() => {
  console.log("Mongodb Connected.");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.render("index");
});

app.post(
  "/profile/upload",
  upload.single("profilePicture"),
  async (req, res) => {
    const { name, email } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      profilePicture: req.file.path,
    });
    console.log(req.file);
    return res.redirect("/");
  },
);

app.listen(PORT, () => {
  console.log(`Server is running at : ${PORT}`);
});
