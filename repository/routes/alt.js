const express = require('express');
const router = express.Router();
const viewController = require('../controllers/altController.js');
const authController = require('../controllers/authController2.js');

// router.use(authController.isLoggedIn);
router.get('/', viewController.default, authController.isLoggedIn);
router.get('/signin', viewController.getLoginForm);
// router.get('/signin', authController.isLoggedIn, viewController.getLoginForm);

/* REFERENCE
 *router.get('/', authController.isLoggedIn); - verify toke and check if user is logged in
 */

module.exports = router;
