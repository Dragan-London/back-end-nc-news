const { fetchUsers } = require("../models/users.model");

exports.getUsersService = () => {
  // this is where business logic would go, e.g.
  // filtering
  // permissions
  // transformations
  // validation
  // "business logic" = "stuff my app cares about"

  return fetchUsers();
};
