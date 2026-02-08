const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postComment,
  patchArticleVotes,
} = require("../controllers/articles.controller");

const handleInvalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

articlesRouter.route("/").get(getArticles).all(handleInvalidMethod);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotes)
  .all(handleInvalidMethod);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postComment)
  .all(handleInvalidMethod);

module.exports = articlesRouter;
