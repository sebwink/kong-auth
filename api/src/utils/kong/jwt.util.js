const axios = require('axios');
const jwt = require('../jwt.util');

const KONG_ADMIN_API = process.env.KONG_AUTH_ADMIN_API || 'http://kong:8001';

const postJwt = async (username) => {
  const url = `${KONG_ADMIN_API}/consumers/${username}/jwt`;
  const response = await axios.post(url, {
    rsa_public_key: jwt.publicKey,
    algorithm: jwt.algorithm,
  });
  return response.data;
};

const postCookieJwt = async (username) => {
  const url = `${KONG_ADMIN_API}/consumers/${username}/cookie-jwt`;
  const response = await axios.post(url, {
    rsa_public_key: jwt.publicKey,
    algorithm: jwt.algorithm,
  });
  return response.data;
};

module.exports = {
  post: postJwt,
  postCookieJwt,
};
