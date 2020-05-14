const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController.js');
const authController = require('../controllers/authController2.js');

// router.use(authController.isLoggedIn);
router.get('/', authController.isLoggedIn);
router.get('/signin', authController.isLoggedIn, viewController.getLoginForm);

module.exports = router;
