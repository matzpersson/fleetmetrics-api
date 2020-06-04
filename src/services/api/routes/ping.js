let router = require('express').Router();

// Ping API response
router.get('/ping', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Pong!'
  });
});

module.exports = router;
