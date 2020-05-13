// const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getLoginForm = (req, res) => {
  res.status(200).render('alt/signIn', {
    title: '🆔 | Sign in',
  });
};

exports.default = (req, res) => {
  res.status(200).render('alt/default', {
    title: '🏠 | Welcome to Yadda Yadda Yadda',
    subtitle: 'Gruppe 2 | Eksamens Project 2.sem',
  });
};
