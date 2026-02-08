const { deleteCommentService } = require("../services/comments.service");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteCommentService(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
