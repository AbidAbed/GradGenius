const { Joi, Segments, celebrate, errors } = require("celebrate");

const stringValidationChain = Joi.string().not().empty();

function postProjectValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: stringValidationChain.required().min(4),
      ownerUserId: stringValidationChain.required(),
      file: Joi.required().not().empty(),
    }),
  });
}

function getProjectValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
      projectId: stringValidationChain.required(),
    }),
  });
}

function getProjectsValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().required().min(1),
    }),
  });
}

module.exports = {
  postProjectValidator,
  getProjectValidator,
  getProjectsValidator,
};
