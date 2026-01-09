const express = require("express");
const app = express();
const connectToDB = require("./db/index");
const healthcheckRouter = require("./routes/healthcheck.routes");
const urlRouter = require("./routes/url.routes");
const PORT = 8000;

connectToDB("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("MongoDB Connected!");
});


app.use(express.json());
app.use("/url", healthcheckRouter, urlRouter);

app.listen(PORT, () => {
  console.log("Server Started!");
});
