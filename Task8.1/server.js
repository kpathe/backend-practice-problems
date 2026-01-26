const express = require("express");
const fs = require("fs");
const app = express();

app.get("/video", (req, res) => {
  const videoSize = fs.statSync("./public/video.mp4").size;

  const range = req.headers.range;

  if (!range) {
    res.writeHead(200, {
      "content-length": videoSize,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream("./public/video.mp4").pipe(res);
  } else {
    const chunk_size = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));

    const end = Math.min(start + chunk_size, videoSize - 1);

    const contentLength = end - start + 1;

    console.log(start, end, contentLength,videoSize,range);

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream("./public/video.mp4", {
      start,
      end,
    });
    videoStream.pipe(res);
  }
});

app.listen(4000, () => {
  console.log("Server listening at PORT 4000");
});
