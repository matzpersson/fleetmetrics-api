// Initialize express router
let router = require('express').Router();

// Import controller
var metricController = require('../controllers/metric');

// routes
router.route('/metrics')
  .get(metricController.index)
  .post(metricController.new);

router.route('/metrics/:id')
  .get(metricController.view)
  .patch(metricController.update)
  .put(metricController.update)
  // .delete(metricController.delete);

router.route('/metrics/models/range')
  .get(metricController.modelrange)

// Export API routes
module.exports = router;
