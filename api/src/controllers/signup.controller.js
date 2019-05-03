const crypto = require('../utils/crypto.util.js');
const jwt = require('../utils/jwt.util');
const mail = require('../utils/mail.util');
const kongConsumer = require('../utils/kong/consumer.util');
const kongBasicAuth = require('../utils/kong/basic.auth.util');
const Consumer = require('../models/consumer.model');
const SignUp = require('../models/signup.model');

const usernameOccupied = async (username) => {
  // TODO: check kong too?, artificial consumers ...
  const usernameRegistered = await Consumer.findOne({ username });
  if (usernameRegistered) {
    return true;
  }
  const usernamePendingSignUp = await SignUp.findOne({ username });
  return usernamePendingSignUp;
};

const emailOccupied = async (email) => {
  const emailRegistered = await Consumer.findOne({ email });
  if (emailRegistered) {
    return true;
  }
  const emailPendingSignUp = await SignUp.findOne({ email });
  return emailPendingSignUp;
};

const postSignup = async (data) => {
  const {
    username,
    email,
    password,
    ui,
  } = data;
  const encryptedPassword = crypto.encrypt(password);
  const signup = new SignUp({
    username,
    email,
    password: encryptedPassword,
  });
  await signup.save();
  const confirmationToken = await jwt.sign({ email }, {
    expiresIn: jwt.expiresIn,
  });
  mail.sendConfirmationLink(
    email,
    confirmationToken,
    ui,
  );
  return {
    message: 'Check your E-Mail for further instructions.',
  };
};

const confirm = token => (
  new Promise(async (resolve) => {
    try {
      const verified = await jwt.verify(token);
      resolve(verified);
    } catch (error) {
      resolve(false);
    }
  })
);

const stillInDatabase = async ({ email }) => {
  const signup = await SignUp.findOne({ email });
  return signup;
};

const verifySignupConfirmation = (signup, { username, password }) => {
  const { username: signupUsername, password: encryptedPassword } = signup;
  const signupPassword = crypto.decrypt(encryptedPassword);
  if (signupUsername !== username || signupPassword !== password) {
    return false;
  }
  return password;
};

const registerConsumer = async (signup, password) => {
  const { username } = signup;
  // delete signup entity
  await SignUp.deleteOne({ username });
  // kong consumer and credentials
  const kongResponse = await kongConsumer.post(username);
  await kongBasicAuth.postCredentials(username, password);
  const passwordHash = await crypto.hashPassword(password);
  // consumer
  const consumer = new Consumer({
    username,
    password: passwordHash,
    kongId: kongResponse.data.id,
    email: signup.email,
  });
  try {
    await consumer.save();
  } catch (error) {
    kongConsumer.delete(username);
    throw error;
  }
};

module.exports = {
  usernameOccupied,
  emailOccupied,
  confirm,
  stillInDatabase,
  verifySignupConfirmation,
  registerConsumer,
  post: postSignup,
};
