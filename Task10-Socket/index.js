const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server,{
    connectionStateRecovery:{}
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected",socket.id);

  socket.on("chat message",(msg)=>{
    io.emit("chat message",msg);
  })
});

server.listen(3000, () => {
  console.log(`Server running at PORT: 3000`);
});
