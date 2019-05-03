const { Router } = require('express');

const messages = require('../utils/messages.util');
const access = require('../controllers/access.controller');

const router = Router();

router.get('/token', async (req, res) => {
  try {
    const kongId = req.headers['x-consumer-id'];
    const accessToken = await access.token(kongId);
    res.status(201);
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    messages.send(messages.INTERNAL_SERVER_ERROR, res);
  }
});

module.exports = router;
