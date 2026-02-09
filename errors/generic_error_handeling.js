const handleCustomErrors = (err, req, res, next) => {
  // Handle custom errors (from our code)
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  // Handle PostgreSQL errors
  else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not found" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { handleCustomErrors, handleServerErrors };
