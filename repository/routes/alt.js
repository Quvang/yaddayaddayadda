const express = require('express');
const router = express.Router();
const altController = require('../controllers/alt/altController.js');
const userController = require('../controllers/userController.js');
const authController = require('../controllers/alt/authController2.js');

// router.use(authController.isLoggedIn);
router.get('/', altController.default, authController.isLoggedIn);
router.get('/signin', altController.getLoginForm);
// router.get('/signin', authController.isLoggedIn, viewController.getLoginForm);

/* REFERENCE
 *router.get('/', authController.isLoggedIn); - verify toke and check if user is logged in
 */

module.exports = router;
