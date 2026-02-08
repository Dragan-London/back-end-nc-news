const apiRouter = require("express").Router();
const topicsRouter = require("./topics.routes");
const articlesRouter = require("./articles.routes");
const usersRouter = require("./users.routes");
const commentsRouter = require("./comments.routes");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
