const commentsRouter = require("express").Router();
const { deleteComment } = require("../controllers/comments.controller");

const handleInvalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

commentsRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .all(handleInvalidMethod);

module.exports = commentsRouter;
