const articlesRouter = require("express").Router();
const { getArticles, getArticleById } = require("../controllers/articles.controller");

const handleInvalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

articlesRouter.route("/").get(getArticles).all(handleInvalidMethod);

articlesRouter.route("/:article_id").get(getArticleById).all(handleInvalidMethod);

module.exports = articlesRouter;
