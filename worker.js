const { parentPort } = require("worker_threads");

let counter = 0;
for (let i = 0; i < 10_000_000_000; i++) {
  counter++;
}

// sends message to the main thread
parentPort.postMessage(`count: ${counter}`);
