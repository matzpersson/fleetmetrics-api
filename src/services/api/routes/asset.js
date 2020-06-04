// Initialize express router
let router = require('express').Router();
const auth = require("../auth");

// Import controller
var assetController = require('../controllers/asset');

// routes
router.route('/assets')
  .get(auth, assetController.index)
  .post(auth, assetController.new);

router.route('/assets/:id')
  .get(auth, assetController.view)
  .patch(auth, assetController.update)
  .put(auth, assetController.update)
  .delete(auth, assetController.delete);

// Export API routes
module.exports = router;
