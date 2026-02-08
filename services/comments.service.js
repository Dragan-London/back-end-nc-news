const { removeComment } = require("../models/comments.model");

exports.deleteCommentService = (comment_id) => {
  return removeComment(comment_id).then((comment) => {
    if (!comment) {
      throw { status: 404, msg: "Comment not found" };
    }
    return comment;
  });
};
