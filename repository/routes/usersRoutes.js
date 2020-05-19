// 1) Requirements
const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController.js');

const router = express.Router();

// 2) Routes
// *** SignUp SignIn SignOut ***
router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);
router.post('/resendConfirmationEmail', authController.resendConfirmationEmail);
router.get('/signOut', authController.logout);

// *** Account Page ***
// WITHOUT API - router.post('/submit-user-data', authController.protect, adminController.updateUserData);
router.patch('/updateMe', authController.protect, userController.uploadUserAvatar, userController.resizeUserAvatar, userController.updateMe);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
// Post Forgot password
// Patch Reset Password

// *** Follow/Following ***
router.post('/followUser', userController.followUser);

module.exports = router;

// // *** Missing Links ***
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

// // *** Admin Controls ***
// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(authController.protect, authController.restrictTo('admin', 'moderator'), userController.deleteUser);
