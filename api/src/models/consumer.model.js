const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const consumerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  kongId: {
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

consumerSchema.methods.checkPassword = async (passwordGuess, done) => {
  try {
    const guessedCorrectly = await bcrypt.compare(passwordGuess, this.password);
    return done(guessedCorrectly);
  } catch (error) {
    return done(error);
  }
};

const Consumer = mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;
