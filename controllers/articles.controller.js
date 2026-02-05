const { getArticlesService } = require("../services/articles.service");

exports.getArticles = (req, res, next) => {
  getArticlesService()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
