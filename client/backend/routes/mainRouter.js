const { Router } = require("express");

const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");

const mainRouter = Router();

mainRouter.use(userRouter);
mainRouter.use(projectRouter);

module.exports = mainRouter;
