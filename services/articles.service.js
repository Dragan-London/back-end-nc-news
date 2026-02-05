const { fetchArticles } = require("../models/articles.model");

exports.getArticlesService = () => {
  // this is where business logic would go, e.g.
  // filtering
  // permissions
  // transformations
  // validation
  // "business logic" = "stuff my app cares about"

  return fetchArticles();
};
