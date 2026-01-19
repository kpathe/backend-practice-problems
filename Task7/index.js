const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const User = require("./models/user.models");
const mongoose = require("mongoose");
const PORT = 8000;
const fs = require("fs");

// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
require("dotenv").config(); // Load the .env file

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
    const filePath = req.file.path;

    const uploadImage = async (filePath) => {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      try {
        const result = await cloudinary.uploader.upload(filePath, options);
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    };

    const uploadedPicture = await uploadImage(filePath);
    // console.log(uploadedPicture);

    const { name, email } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      profilePicture: uploadedPicture.secure_url,
    });

    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`Local file with path ${filePath} deleted`);
    });
    return res.json({ msg: "Profile created successfully", user: user.name });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running at : ${PORT}`);
});
