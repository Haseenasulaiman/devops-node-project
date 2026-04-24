const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3000;

client.collectDefaultMetrics();

app.get("/", (req, res) => {
  res.send("DevOps Node.js Application is Running Successfully");
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Application is healthy"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});