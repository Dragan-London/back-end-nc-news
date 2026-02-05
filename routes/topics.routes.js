const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topics.controller');

const handleInvalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

topicsRouter
  .route('/')
  .get(getTopics)
  .all(handleInvalidMethod);

module.exports = topicsRouter;
