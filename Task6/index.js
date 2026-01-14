const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/index");
const PORT = process.env.PORT || 8001;
const mongo_uri = process.env.MongoURI;
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

const healthCheckRouter = require("./routes/healthCheck.routes");
const { requireAuth } = require("./middlewares/auth.middlewares");

connectDB(mongo_uri).then(() => {
  console.log("MongoDB Connected!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", healthCheckRouter);
app.use("/user", userRouter);

app.get("/diary-entry", requireAuth, (req, res) => {
  res.send("<h1>These are your diary entries</h1>");
});

app.get("/", (req, res) => {
  res.send("Hi from server");
});
app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
