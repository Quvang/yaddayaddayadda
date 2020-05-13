const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const { forwardAuthenticated } = require('../config/auth');
const { check, validationResult } = require('express-validator');

// NEW REGISTER / LOGIN
const authController = require('./../controllers/alt/authController2');
const userController = require('../controllers/userController.js');

router.get('/register', forwardAuthenticated, auth.register);
router.post(
  '/register',
  [
    check('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    check('firstName').trim().isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters'),
    check('lastName').trim().isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters'),
    check('email').trim().isEmail().normalizeEmail().withMessage('Email is not valid'),
  ],
  auth.uploadAvatar,
  auth.postRegister
);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', auth.postLogin);

router.get('/logout', auth.logout);

// NEW REGISTER / LOGIN
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

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

module.exports = router;
