const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const { forwardAuthenticated } = require('../config/auth');

const  { check, validationResult } = require('express-validator');

router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', 
[
    check('email').isEmail().normalizeEmail().withMessage('Your Email is not valid')
]
, auth.uploadAvatar, auth.postRegister);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', auth.postLogin);

router.get('/logout', auth.logout);

module.exports = router;
