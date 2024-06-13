const { Router } = require("express");
const {
  Joi,
  Segments,
  celebrate,
  errors,
  isCelebrateError,
} = require("celebrate");

const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");

const mainRouter = Router();

mainRouter.use(userRouter);
mainRouter.use(projectRouter);

async function errorHandler(err, req, res, next) {
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const [arr] = err.details.entries();

  const [obj] = arr[1].details;

  const result = {
    statusCode: 400,
    error: "Bad Request",
    message: obj.message,
    validation: {
      source: err.source,
      keys: [],
    },
  };

  if (err.details) {
    for (let i = 0; i < err.details.length; i += 1) {
      const path = err.details[i].path.join(".");
      result.validation.keys.push(EscapeHtml(path));
    }
  }

  return res.status(400).send(result);
}

mainRouter.use(errorHandler);

module.exports = mainRouter;
