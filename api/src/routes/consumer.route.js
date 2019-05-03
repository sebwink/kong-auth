const { Router } = require('express');

const messages = require('../utils/messages.util');
const Consumer = require('../models/consumer.model');
const kongConsumer = require('../utils/kong/consumer.util');

const router = Router();

router.delete('/', async (req, res) => {
  try {
    const username = req.headers['x-consumer-username'];
    const consumer = await Consumer.findOne({ username });
    await Consumer.deleteOne({ username });
    try {
      await kongConsumer.delete(username);
    } catch (error) {
      await consumer.save();
      throw error;
    }
    messages.send(['Deleted.', 200], res);
  } catch (error) {
    messages.send(messages.INTERNAL_SERVER_ERROR, res);
  }
});

module.exports = router;
