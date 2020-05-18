// 1) Requirements
const express = require('express');
const idx = require('../controllers/indexController');
const authController = require('../controllers/authController.js');
const tagController = require('../controllers/tagController.js');

const router = express.Router();

// 2) Routes
// *** Not logged in ***
router.get('/', authController.isLoggedIn, idx.default);
router.get('/signUp', authController.isLoggedIn, idx.getSignUpForm);
router.get('/signIn', authController.isLoggedIn, idx.getLoginForm);
router.get('/confirmation/:token', authController.isLoggedIn, authController.emailConfirm);
router.get('/resendConfirmationEmail', authController.isLoggedIn, idx.getResendForm);
router.get('/about', authController.isLoggedIn, idx.about);

// *** Logged in User ***
router.get('/dashboard', authController.protect, idx.dashboard);
router.get('/profile', authController.protect, idx.profile);
router.post('/userProfile', authController.protect, idx.userProfile); // Andre profiler end den som er logget ind.
router.get('/messages', authController.protect, idx.messages);
router.get('/explore', authController.protect, idx.explore);
router.get('/tags', authController.protect, tagController.tags);
router.post('/searchTags', authController.protect, tagController.searchTags);

router.get('/account', authController.protect, idx.account);

// *** Logged in Moderator ***
router.get('/moderatorpanel', authController.protect, authController.restrictTo('moderator', 'admin'), idx.moderatorPanel);

// *** Logged in Admin ***
router.get('/adminpanel', authController.protect, authController.restrictTo('admin'), idx.adminPanel);

module.exports = router;
