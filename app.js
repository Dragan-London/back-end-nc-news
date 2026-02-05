const express = require("express");
const apiRouter = require("./routes/api.routes");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

// Catch-all for invalid paths
app.use((req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
