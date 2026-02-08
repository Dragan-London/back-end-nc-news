const express = require("express");
const apiRouter = require("./routes/api.routes");
const handleNotFound = require("./errors/not_found_error");
const {
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/generic_error_handeling");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

// Catch-all for invalid paths
app.use(handleNotFound);

// Error handling middleware
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
