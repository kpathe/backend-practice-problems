const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const connectToDB = require("./db/index");
const PORT = 8000;

const healthcheckRouter = require("./routes/healthcheck.routes");
const urlRouter = require("./routes/url.routes");
const staticRouter = require("./routes/static.routes");
const authRouter = require("./routes/auth.routes");

const { restrictUser, loggedInUser } = require("./middlewares/auth.middleware");

connectToDB("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("MongoDB Connected!");
});

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/", loggedInUser, staticRouter);
app.use("/url", healthcheckRouter, restrictUser, urlRouter);
app.use("/user", authRouter);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}!`);
});
