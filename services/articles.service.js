const {
  fetchArticles,
  fetchArticlesById,
  fetchCommentsByArticleId,
  insertComment,
} = require("../models/articles.model");

exports.getArticlesService = () => {
  // this is where business logic would go, e.g.
  // filtering
  // permissions
  // transformations
  // validation
  // "business logic" = "stuff my app cares about"

  return fetchArticles();
};

exports.getArticleByIdService = (user_article_id) => {
  return fetchArticlesById(user_article_id);
};

exports.getCommentsByArticleIdService = (article_id) => {
  return fetchArticlesById(article_id).then((article) => {
    if (!article) {
      throw { status: 404, msg: "Article not found" };
    }
    return fetchCommentsByArticleId(article_id);
  });
};

exports.postCommentService = (article_id, username, body) => {
  if (!username || !body) {
    throw { status: 400, msg: "Bad request" };
  }

  return fetchArticlesById(article_id).then((article) => {
    if (!article) {
      throw { status: 404, msg: "Article not found" };
    }
    return insertComment(article_id, username, body);
  });
};
