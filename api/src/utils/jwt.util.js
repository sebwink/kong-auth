const fs = require('fs');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.KONG_AUTH_PRIVATE_KEY || '/app/.secrets/private.pem';
const privateKey = fs.readFileSync(PRIVATE_KEY);

const PUBLIC_KEY = process.env.KONG_AUTH_PUBLIC_KEY || '/app/.secrets/public.pem';
const publicKey = fs.readFileSync(PUBLIC_KEY);

const JWT_ALGORITHM = process.env_KONG_AUTH_JWT_ALGORITHM || 'RS256';

const SIGNUP_CONFIRMATION_TIME_WINDOW = process.env.KONG_AUTH_SIGNUP_CONFIRMATION_TIME_WINDOW || 3600;

const jwtSign = (payload, secretOrPrivateKey, options) => (
  new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  })
);

const sign = (payload, options) => (
  new Promise(async (resolve, reject) => {
    try {
      const token = await jwtSign(payload, privateKey, {
        ...options,
        algorithm: JWT_ALGORITHM,
      });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  })
);

const jwtVerify = (token, secretOrPrivateKey, options) => (
  new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, options, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  })
);

const verify = (token, options) => (
  new Promise(async (resolve) => {
    try {
      const decoded = await jwtVerify(token, publicKey, {
        ...options,
        algorithms: [JWT_ALGORITHM],
      });
      resolve(decoded);
    } catch (error) {
      resolve(false);
    }
  })
);

module.exports = {
  sign,
  verify,
  publicKey: publicKey.toString('utf-8'),
  algorithm: JWT_ALGORITHM,
  expiresIn: SIGNUP_CONFIRMATION_TIME_WINDOW,
};
