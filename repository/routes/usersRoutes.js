// 1) Requirements
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController2');
const userController = require('../controllers/userController.js');
const altController = require('../controllers/altController.js');

// SignUp SignIn SignOut
router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);
router.post('/resendConfirmationEmail', authController.resendConfirmationEmail);
router.get('/signOut', authController.logout);

// Account Page
router.patch('/updateMe', authController.protect, userController.updateMe); // WITHOUT API - router.post('/submit-user-data', authController.protect, altController.updateUserData);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
// Post Forgot password
// Patch Reset Password

module.exports = router;

/* //Missing Links
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// Admin Controls
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin', 'moderator'), userController.deleteUser);
 */
