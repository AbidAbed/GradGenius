const { Joi, Segments, celebrate, errors } = require("celebrate");

const stringValidationChain = Joi.string().not().empty();
function postUserSignupValidator() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: stringValidationChain.email().required(),
      password: stringValidationChain.min(8).required(),
      phone: stringValidationChain.min(10).required(),
      telegram: stringValidationChain.required(),
      username: stringValidationChain.min(5).required(),
    }),
  });
}

function postUserSigninValidator() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: stringValidationChain.email().required(),
      password: stringValidationChain.min(8).required(),
    }),
  });
}

function putUserProfileValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      email: stringValidationChain.email().optional(),
      password: stringValidationChain.min(8).optional(),
      phone: stringValidationChain.min(10).optional(),
      telegram: stringValidationChain.optional(),
      username: stringValidationChain.min(5).optional(),
    }),
  });
}

function postLogoutUserValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
  });
}

function postAuthUserValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: stringValidationChain.required(),
    }),
  });
}

module.exports = {
  postUserSignupValidator,
  postUserSigninValidator,
  putUserProfileValidator,
  postLogoutUserValidator,
  postAuthUserValidator,
};