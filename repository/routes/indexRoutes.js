// 1) Requirements
// *** Main and Alternative ***
const express = require('express');
const router = express.Router();

// Main
// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const auth = require('../controllers/authController.js');
const idx = require('../controllers/indexController');
const ydc = require('../controllers/yaddaController');

// *** Alternative ***
const altController = require('../controllers/altController.js');
const authController = require('../controllers/authController2.js');

// 2) Routes
// *** Not logged in ***
router.get('/', authController.isLoggedIn, altController.default);
router.get('/register', authController.isLoggedIn, auth.register);
router.get('/signUp', authController.isLoggedIn, altController.getSignUpForm);
router.get('/signIn', authController.isLoggedIn, altController.getLoginForm);
router.get('/confirmation/:token', authController.isLoggedIn, authController.emailConfirm);

// *** Logged in User ***
router.get('/dashboard', authController.protect, idx.dashboard);
router.get('/profile', authController.protect, idx.profile);
router.get('/messages', authController.protect, idx.messages);
router.get('/explore', authController.protect, idx.explore);
router.get('/tags', authController.protect, idx.tags);

router.get('/account', authController.protect, altController.account);

// *** Logged in Moderator ***
// Moderator Control Panel

// *** Logged in Admin ***
router.get('/adminpanel', authController.protect, authController.restrictTo('admin'), altController.adminPanel);

module.exports = router;
