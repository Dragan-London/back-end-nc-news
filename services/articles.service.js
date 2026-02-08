const {
  fetchArticles,
  fetchArticlesById,
  fetchCommentsByArticleId,
  insertComment,
  updateArticleVotes,
} = require("../models/articles.model");

const { checkTopicExists } = require("../models/topics.model");

exports.getArticlesService = (topic, sort_by, order) => {
  // this is where business logic would go, e.g.
  // filtering
  // permissions
  // transformations
  // validation
  // "business logic" = "stuff my app cares about"

  if (topic) {
    return checkTopicExists(topic).then(() => {
      return fetchArticles(topic, sort_by, order);
    });
  }

  return fetchArticles(topic, sort_by, order);
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

exports.patchArticleVotesService = (article_id, inc_votes) => {
  if (inc_votes === undefined) {
    throw { status: 400, msg: "Bad request" };
  }

  return updateArticleVotes(article_id, inc_votes).then((article) => {
    if (!article) {
      throw { status: 404, msg: "Article not found" };
    }
    return article;
  });
};
