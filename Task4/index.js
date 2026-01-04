const express = require("express");
const app = express();
const PORT = 8000;

app.use((req, res, next) => {
  //   console.log(req.headers);
  if (!req.headers["x-api-key"]) {
    return res.status(403).json({ msg: "Forbidden" });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(PORT, () => console.log("Server started at PORT ", PORT));
