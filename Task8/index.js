require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const tweetRouter = require("./routes/tweet.routes");
const verifyJWT = require("./middlewares/auth.middlewares");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const mongodbURI = process.env.MONGODB_URI;

connectDB(mongodbURI);
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/tweet", verifyJWT, tweetRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT : ${PORT}`);
});
