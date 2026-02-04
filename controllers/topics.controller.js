const { getTopicsService } = require("../services/topics.service");

exports.getTopics = (req, res, next) => {
  getTopicsService()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
