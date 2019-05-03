const { Router } = require('express');

const messages = require('../utils/messages.util');

const router = Router();

router.post('/', async (req, res) => {
  try {
    res.clearCookie('session', {
      httpOnly: true,
      secure: true,
    });
    res.status(200);
    res.json({
      message: 'Logged out.',
    });
  } catch (error) {
    console.log(error);
    messages.send(messages.INTERNAL_SERVER_ERROR, res);
  }
});

module.exports = router;
