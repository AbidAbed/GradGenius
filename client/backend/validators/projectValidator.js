const { Joi, Segments, celebrate, errors } = require("celebrate");

const stringValidationChain = Joi.string().not().empty();

function postProjectValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.BODY]: Joi.object().keys({}),
  });
}

function getProjectValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.BODY]: Joi.object().keys({}),
  });
}

function getProjectsValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.BODY]: Joi.object().keys({}),
  });
}

module.exports = {
  postProjectValidator,
  getProjectValidator,
  getProjectsValidator,
};
