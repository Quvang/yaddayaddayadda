// const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getLoginForm = (req, res) => {
    res.status(200).render('signIn', {
        title: 'Log into your account',
    });
};
