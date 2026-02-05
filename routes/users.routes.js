const usersRouter = require("express").Router();
const { getUsers } = require("../controllers/users.controller");

const handleInvalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

usersRouter.route("/").get(getUsers).all(handleInvalidMethod);

module.exports = usersRouter;
