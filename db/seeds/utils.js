const format = require("pg-format");
const db = require("../connection");
const createLookupObject = require("./functionForUtils");

function insertAllData(topicData, userData, articleData, commentData) {
  // Insert topics data
  const insertTopicsQueryStr = format(
    `INSERT INTO topics (slug, description, img_url) VALUES %L;`,
    topicData.map(({ slug, description, img_url }) => [
      slug,
      description,
      img_url,
    ]),
  );

  return db
    .query(insertTopicsQueryStr)
    .then(() => {
      // Insert users data
      const insertUsersQueryStr = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L;`,
        userData.map(({ username, name, avatar_url }) => [
          username,
          name,
          avatar_url,
        ]),
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      // Insert articles with RETURNING to get IDs
      const insertArticlesQueryStr = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;`,
        articleData.map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url,
          }) => [
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url,
          ],
        ),
      );
      return db.query(insertArticlesQueryStr);
    })
    .then(({ rows }) => {
      // Insert comments using article lookup
      const articleLookup = createLookupObject(rows, "title", "article_id");

      const formattedComments = commentData.map((comment) => {
        return [
          comment.body,
          comment.votes,
          comment.author,
          articleLookup[comment.article_title],
          comment.created_at,
        ];
      });

      const insertCommentsQueryStr = format(
        `INSERT INTO comments (body, votes, author, article_id, created_at) VALUES %L;`,
        formattedComments,
      );
      return db.query(insertCommentsQueryStr);
    });
}

module.exports = { insertAllData };
