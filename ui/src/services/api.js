const axios = require('axios');

const deregnetRestRoot = process.env.AUTH_API_ROOT || 'https://dereg.net/auth/api';

export const postSignup = ({ username, password, email }) => (
  new Promise(async (resolve, reject) => {
    const url = `${deregnetRestRoot}/signup`;
    try {
      const response = await axios.post(url, {
        username,
        password,
        email,
        ui: true,
      });
      resolve(response);
    } catch (error) {
      if (error.response) {
        resolve(error.response);
      } else {
        reject(error);
      }
    }
  })
);

export const getSignupConfirm = token => (
  new Promise(async (resolve) => {
    try {
      await axios.get(`${deregnetRestRoot}/signup/confirm?token=${token}`);
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  })
);

export const postSignupConfirm = (username, password, token) => (
  new Promise(async (resolve) => {
    try {
      await axios.post(`${deregnetRestRoot}/signup/confirm?token=${token}`, {
        username,
        password,
      });
      resolve(true);
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  })
);

export const getLogin = () => (
  new Promise(async (resolve) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.get(`${deregnetRestRoot}/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(true);
    } catch (error) {
      resolve(null);
    }
  })
);

export const postLogin = (username, password) => (
  new Promise(async (resolve) => {
    try {
      const response = await axios.post(`${deregnetRestRoot}/login`, null, {
        auth: {
          username,
          password,
        },
      });
      const { accessToken } = response.data;
      resolve(accessToken);
    } catch (error) {
      resolve(null);
    }
  })
);

export const postLogout = () => (
  new Promise(async (resolve) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${deregnetRestRoot}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(true);
    } catch (error) {
      resolve(null);
    }
  })
);

export default {
  postSignup,
  getSignupConfirm,
  postSignupConfirm,
  getLogin,
  postLogin,
  postLogout,
};
