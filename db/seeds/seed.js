const db = require("../connection");
const { insertAllData } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS testing;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE topics (
          slug VARCHAR(255) PRIMARY KEY,
          description VARCHAR NOT NULL,
          img_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          username VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          avatar_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          topic VARCHAR(255) NOT NULL REFERENCES topics(slug),
          author VARCHAR(255) NOT NULL REFERENCES users(username),
          body TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR(255) NOT NULL REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    })
    .then(() => {
      return insertAllData(topicData, userData, articleData, commentData);
    });
};

module.exports = seed;
