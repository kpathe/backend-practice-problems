const express = require("express");
const app = express();
const connectToDB = require("./db/index");
const healthcheckRoute = require("./routes/healthcheck.routes");
const PORT = 8000;

connectToDB("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("MongoDB Connected!");
});

app.use("/url", healthcheckRoute);

app.listen(PORT, () => {
  console.log("Server Started!");
});
