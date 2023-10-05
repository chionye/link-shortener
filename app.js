const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("test");
});
// Custom error handler for incorrect URLs
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handler middleware for all other errors
app.use((err, req, res, next) => {
  if (err instanceof URIError) {
    res.status(400).json({ error: "Invalid URL" });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;