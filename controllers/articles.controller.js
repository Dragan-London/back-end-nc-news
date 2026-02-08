const {
  getArticlesService,
  getArticleByIdService,
  getCommentsByArticleIdService,
  postCommentService,
  patchArticleVotesService,
} = require("../services/articles.service");

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  getArticlesService(topic, sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  getArticleByIdService(article_id)
    .then((article) => {
      if (!article) {
        throw { status: 404, msg: "Article not found" };
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  getCommentsByArticleIdService(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  postCommentService(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  patchArticleVotesService(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
