const mongoose = require('mongoose');

const SIGNUP_CONFIRMATION_TIME_WINDOW = process.env.KONG_AUTH_SIGNUP_CONFIRMATION_TIME_WINDOW || 3600;

const signupSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

signupSchema.index({
  createdAt: 1,
}, {
  expireAfterSeconds: SIGNUP_CONFIRMATION_TIME_WINDOW + 120,
});

const SignUp = mongoose.model('SignUp', signupSchema);

module.exports = SignUp;
