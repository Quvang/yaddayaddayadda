const express = require('express');
const router = express.Router();
const altController = require('../controllers/alt/altController.js');
const authController = require('../controllers/alt/authController2.js');
const userController = require('../controllers/userController.js');

// Verifies the jwt- Navbar will change depending on if any user is logged in

router.use(authController.isLoggedIn);

// Not Logged in
router.get('/', altController.default);
router.get('/about', altController.about);
router.get('/signIn', altController.getLoginForm);
router.post('/signIn', authController.signin);
router.post('/signup', authController.signup); // No pug
router.get('/confirmation/:token', authController.emailConfirm);

// Logged in
router.get('/signOut', authController.logout);
router.get('/account', authController.protect, altController.account);
router.get('/adminpanel', authController.protect, authController.restrictTo('admin'), altController.adminPanel);

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
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// Admin Routes
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin', 'moderator'), userController.deleteUser);
*/
