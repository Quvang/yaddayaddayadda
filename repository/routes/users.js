const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const { forwardAuthenticated } = require('../config/auth');

const  { check, validationResult } = require('express-validator');

router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', 
[
    check('username')
        .trim().isLength({min: 3}).withMessage('Username must be at least 3 characters'),
    check('firstName')
        .trim().isLength({min: 2}).withMessage('Firstname must be at least 2 characters'),
    check('lastName')
        .trim().isLength({min: 2}).withMessage('Lastname must be at least 2 characters'),
    check('email')
        .trim().isEmail().normalizeEmail().withMessage('Email is not valid')

], auth.uploadAvatar, auth.postRegister);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', auth.postLogin);

router.get('/logout', auth.logout);

module.exports = router;
