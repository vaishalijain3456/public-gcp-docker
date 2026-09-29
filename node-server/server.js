// Day 2 -- a very simple web server, used to learn how Cloud Run works.
import express from "express";

const app = express();

// Day 2 -- Cloud Run tells the app which port to listen on. If that's
// not set (like when running on our own computer), use 8080.
const PORT = process.env.PORT || 8080;

// Day 2 -- the main page, just to prove the server is working.
app.get("/", (req, res) => {
  res.send("Hello from Node.js + Express!");
});

// Day 4 -- a simple health-check page. Cloud Logging/Monitoring can use
// this to check if the app is still working properly.
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});