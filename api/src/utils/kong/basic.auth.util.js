const axios = require('axios');

const KONG_ADMIN_API = process.env.KONG_AUTH_ADMIN_API || 'http://kong:8001';

const postCredentials = (username, password) => {
  const url = `${KONG_ADMIN_API}/consumers/${username}/basic-auth`;
  return axios.post(url, {
    username,
    password,
  });
};

module.exports = {
  postCredentials,
};
