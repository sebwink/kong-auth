const joi = require('joi');

const schemas = new Map();

const postSignupSchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string(),
  ui: joi.boolean(),
});

const postSignupConfirm = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

schemas.set('POST@/signup', postSignupSchema);
schemas.set('POST@/signup/confirm', postSignupConfirm);

module.exports = schemas;
