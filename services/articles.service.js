const {
  fetchArticles,
  fetchArticlesById,
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
