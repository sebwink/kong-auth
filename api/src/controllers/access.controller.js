const Consumer = require('../models/consumer.model');
const jwt = require('../utils/jwt.util');
const kongJwt = require('../utils/kong/jwt.util');

const token = async (kongId) => {
  const { username } = await Consumer.findOne({ kongId });
  const { key } = await kongJwt.post(username);
  const accessToken = await jwt.sign({ iss: key });
  return accessToken;
};

const registerAndSignCookieToken = async (kongId) => {
  const { username } = await Consumer.findOne({ kongId });
  const { key } = await kongJwt.postCookieJwt(username);
  const cookieToken = await jwt.sign({ iss: key });
  return cookieToken;
};

module.exports = {
  token,
  cookieToken: registerAndSignCookieToken,
};
