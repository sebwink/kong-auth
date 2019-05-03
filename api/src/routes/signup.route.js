const { Router } = require('express');

const messages = require('../utils/messages.util');
const signup = require('../controllers/signup.controller');

const router = Router();

// POST /signup
router.post('/', async (req, res) => {
  try {
    const usernameInvalid = await signup.usernameOccupied(req.body.username);
    const emailInvalid = await signup.emailOccupied(req.body.email);
    if (usernameInvalid) {
      messages.send(['Username already in use.', 409], res);
    } else if (emailInvalid) {
      messages.send(['Email already in use.', 409], res);
    } else {
      const response = await signup.post(req.body);
      res.status(201);
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    messages.send(messages.INTERNAL_SERVER_ERROR, res);
  }
});

// GET /signup/confirm?token=<token>
router.get('/confirm', async (req, res) => {
  try {
    const verified = await signup.confirm(req.query.token);
    if (!verified) {
      messages.send(messages.INVALID_TOKEN, res);
    } else {
      const validSignup = await signup.stillInDatabase(verified);
      if (validSignup) {
        messages.send(['Token valid.', 201], res);
      } else {
        messages.send(messages.INVALID_TOKEN, res);
      }
    }
  } catch (error) {
    console.log(error);
    messages.send(messages.INTERNAL_SERVER_ERROR, res);
  }
});

// POST /signup/confirm?token=<token>
router.post('/confirm', async (req, res) => {
  try {
    const verified = await signup.confirm(req.query.token);
    if (!verified) {
      messages.send(messages.INVALID_TOKEN, res);
    } else {
      const validSignup = await signup.stillInDatabase(verified);
      const password = signup.verifySignupConfirmation(validSignup, req.body);
      if (validSignup && password) {
        await signup.registerConsumer(validSignup, password);
        messages.send(['Your account has been confirmed.', 201], res);
      } else {
        messages.send(messages.INVALID_TOKEN, res);
      }
    }
  } catch (error) {
    console.log(error);
    messages.send(messages.INTERNAL_SERVER_ERROR, res);
  }
});

module.exports = router;
