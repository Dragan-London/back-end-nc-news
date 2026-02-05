const apiRouter = require("express").Router();
const topicsRouter = require("./topics.routes");
const articlesRouter = require("./articles.routes");
const usersRouter = require("./users.routes");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
