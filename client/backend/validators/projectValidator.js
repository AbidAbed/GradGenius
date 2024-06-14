const { Joi, Segments, celebrate, errors } = require("celebrate");

const stringValidationChain = Joi.string().not().empty();

function postProjectValidator(req,res) {

  console.log(req);
  const currentDate = new Date(Date.now());
  const minDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

  return celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: stringValidationChain.required(),
      })
      .unknown(true),
    [Segments.BODY]: Joi.object().keys({
      name: stringValidationChain.required().min(4),
      deadline: Joi.number().required().min(minDate.getTime()),
      teamSize: Joi.number().required(),
      isWithDocumentation: Joi.boolean().required(),
    }),
  });
}

function getProjectValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: stringValidationChain.required(),
      })
      .unknown(true),
    [Segments.QUERY]: Joi.object().keys({
      projectId: stringValidationChain.required(),
    }),
  });
}

function getProjectsValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: stringValidationChain.required(),
      })
      .unknown(true),
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
