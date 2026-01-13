const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/index");
const PORT = process.env.PORT || 8001;
const mongo_uri = process.env.MongoURI;

const healthCheckRouter = require("./routes/healthCheck.routes");

connectDB(mongo_uri).then(() => {
  console.log("MongoDB Connected!");
});

app.use("/", healthCheckRouter);

app.get("/", (req, res) => {
  res.send("Hi from server");
});
app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
