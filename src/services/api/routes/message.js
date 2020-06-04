let router = require('express').Router();

// Controller
var messageController = require('../controllers/message');

// Routes
router.route('/messages')
  .get(messageController.index)
  .post(messageController.new);

router.route('/messages/:id')
  .get(messageController.view)
  .patch(messageController.update)
  .put(messageController.update)
  .delete(messageController.delete);

// Export API routes
module.exports = router;
