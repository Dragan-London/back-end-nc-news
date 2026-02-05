const apiRouter = require("express").Router();
const topicsRouter = require("./topics.routes");
const articlesRouter = require("./articles.routes");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
