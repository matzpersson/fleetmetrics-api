// Initialize express router
let router = require('express').Router();
const auth = require("../auth");

// Import controller
var userController = require('../controllers/user');

// routes
router.route('/users')
  .get(auth, userController.index)
  .post(auth, userController.new);

router.route('/users/:id')
  .get(auth, userController.view)
  .patch(auth, userController.update)
  .put(auth, userController.update)
  .delete(auth, userController.delete);

router.put("/current", auth, userController.updateCurrent)
router.get("/current", auth, userController.viewCurrent)

router.route('/login')
  .post(userController.login)

// Export API routes
module.exports = router;
