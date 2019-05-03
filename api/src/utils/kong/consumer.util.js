const axios = require('axios');

const KONG_ADMIN_API = process.env.KONG_AUTH_ADMIN_API || 'http://kong:8001';

const kongConsumers = `${KONG_ADMIN_API}/consumers`;

const postConsumer = async username => (
  axios.post(kongConsumers, { username })
);

const getConsumer = async (username) => {
  const url = `${kongConsumers}/${username}`;
  return axios.get(url);
};

const deleteConsumer = async (username) => {
  const url = `${kongConsumers}/${username}`;
  return axios.delete(url);
};

module.exports = {
  post: postConsumer,
  get: getConsumer,
  delete: deleteConsumer,
};
