const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const currentDate = new Date();

  const log = `IP : ${req.socket.remoteAddress} | ${currentDate} | New Request Received\n`;

  fs.appendFile("log.txt", log, (err, data) => {
    res.end("Hello from server");
  });
});

server.listen(8000, () => {
  console.log("Server started");
});
