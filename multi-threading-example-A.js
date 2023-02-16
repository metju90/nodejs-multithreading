const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/count", (req, res) => {
  let counter = 0;
  for (let i = 0; i < 15_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`Finishing counting`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
