const cluster = require("node:cluster");
const os = require("os");
const totalCPUs = os.cpus().length;
const app = require("./app");
// console.log(totalCPUs);

console.log(cluster.isPrimary);

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const PORT = 8000;
  app.get("/", (req, res) => {
    console.log(`Worker ${process.pid} handled request`); 
    return res.json({ message: `Hello from Express Server ${process.pid}` });
  });

  app.listen(PORT, () => {
    console.log(`Server started at PORT : ${PORT}`);
  });
}

// loadtest -n 1000 -c 100 http://localhost:8000 
// command to test the server for 1000 concurrent users