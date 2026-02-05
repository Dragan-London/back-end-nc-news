const { getUsersService } = require("../services/users.service");

exports.getUsers = (req, res, next) => {
  getUsersService()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
