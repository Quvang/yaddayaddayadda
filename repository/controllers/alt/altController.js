// const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// Home
exports.default = (req, res) => {
  res.status(200).render('alt/default', {
    title: '👁️ | Welcome to Yadda Yadda Yadda',
    subtitle: 'Gruppe 2 | Eksamens Project 2.sem',
  });
};

// Sign In
exports.getLoginForm = (req, res) => {
  res.status(200).render('alt/signIn', {
    title: '👁️ | Sign in',
  });
};

// Account
exports.account = (req, res) => {
  res.status(200).render('alt/account', {
    title: '🔒 | Account',
  });
};

// Admin Panel
exports.adminPanel = (req, res) => {
  res.status(200).render('alt/adminPanel', {
    title: '🔒🔒🔒 | Admin Panel',
  });
};

// About Us
exports.about = (req, res) => {
  res.status(200).render('alt/about', {
    title: '👁️ | About Us',
  });
};
