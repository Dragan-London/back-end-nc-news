const articlesRouter = require("express").Router();
const { getArticles } = require("../controllers/articles.controller");

const handleInvalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

articlesRouter.route("/").get(getArticles).all(handleInvalidMethod);

module.exports = articlesRouter;
