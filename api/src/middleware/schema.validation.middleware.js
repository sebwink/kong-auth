const joi = require('joi');
const messages = require('../utils/messages.util');
const signupSchemas = require('../schemas/signup.schema');
const consumerSchemas = require('../schemas/consumer.schema');

const isValid = (data, schema) => (
  new Promise((resolve) => {
    joi.validate(data, schema, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  })
);

const schemas = new Map([
  ...signupSchemas.entries(),
  ...consumerSchemas.entries(),
]);

const validate = async (key, data) => {
  const schema = schemas.get(key);
  if (schema) {
    return isValid(data, schema);
  }
  return true;
};

const validateSchema = async (req, res, next) => {
  const { method, baseUrl, path } = req;
  const url = `${baseUrl}${path.replace(/\/$/, '')}`;
  const schemaKey = `${method}@${url}`;
  const valid = await validate(schemaKey, req.body);
  if (valid) {
    next();
  } else {
    messages.send(messages.INVALID_PAYLOAD, res);
  }
};

module.exports = validateSchema;
