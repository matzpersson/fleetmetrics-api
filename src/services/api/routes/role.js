// Initialize express router
let router = require('express').Router();

// Import controller
var roleController = require('../controllers/role');

// routes
router.route('/roles')
  .get(roleController.index)

// Export API routes
module.exports = router;
