const cluster = require("node:cluster");
const http = require("node:http");
const os = require("node:os");
const process = require("node:process");

const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const server = http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`hello from worker ${cluster.worker.id} `);
    })
    .listen(8000);

  console.log(`Worker #${cluster.worker.id} with PID ${process.pid} started`);
}
