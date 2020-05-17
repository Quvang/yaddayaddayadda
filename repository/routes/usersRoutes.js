// 1) Requirements
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController2');
const userController = require('../controllers/userController.js');
const altController = require('../controllers/altController.js');

// Post Register
router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);
router.get('/signOut', authController.logout);

// Post Forgot password
// Patch Reset Password

// Patch Update password
router.patch('/updateMe', authController.protect, userController.updateMe); // WITHOUT API - router.post('/submit-user-data', authController.protect, altController.updateUserData);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

// Missing Links
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
