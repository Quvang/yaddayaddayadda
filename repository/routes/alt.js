const express = require('express');
const router = express.Router();
const altController = require('../controllers/alt/altController.js');
const authController = require('../controllers/alt/authController2.js');
const userController = require('../controllers/userController.js');

// Not Logged in
router.get('/', authController.isLoggedIn, altController.default);
router.get('/about', authController.isLoggedIn, altController.about);
router.get('/signIn', authController.isLoggedIn, altController.getLoginForm);
router.post('/signIn', authController.isLoggedIn, authController.signin);
router.post('/signup', authController.isLoggedIn, authController.signup); // No pug
router.get('/confirmation/:token', authController.isLoggedIn, authController.emailConfirm);

// Logged in
router.get('/signOut', authController.logout);
router.get('/account', authController.protect, altController.account);
router.get('/adminpanel', authController.protect, authController.restrictTo('admin'), altController.adminPanel);

// Update profile
router.patch('/updateMe', authController.protect, userController.updateMe); // WITHOUT API - router.post('/submit-user-data', authController.protect, altController.updateUserData);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

module.exports = router;

//
//
//
//
// SORT THESE ACCORDINGLY AT SOME POINT
// NEW REGISTER / LOGIN

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
/*

// Test Routes
// Guesst Routes
router.route('/').get(userController.getAllUsers).post(userController.createUser);

// Logged in Routes
router.get('/loggedInTest', authController.protect, userController.getAllUsers);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// Admin Routes
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin', 'moderator'), userController.deleteUser);
*/
