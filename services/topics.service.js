const { fetchTopics } = require("../models/topics.model");

exports.getTopicsService = () => {
  // this is where business logic would go, e.g.
  // filtering
  // permissions
  // transformations
  // validation
  // "business logic" = "stuff my app cares about"

  return fetchTopics();
};
