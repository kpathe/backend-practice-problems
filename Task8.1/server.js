const express = require("express");
const fs = require("fs");
const app = express();

const fileStats = fs.statSync("./public/video.mp4");
const fileSize = fileStats.size;

app.get("/video", (req, res) => {
  const stream = fs.createReadStream("./public/video.mp4");
  res.writeHead(200, {
    "Content-Length": fileSize,
    "Content-Type": "video/mp4",
  });
  stream.pipe(res);
});

app.listen(4000, () => {
  console.log("Server listening at PORT 4000");
});
