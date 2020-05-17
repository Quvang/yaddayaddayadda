const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// Home
exports.default = (req, res) => {
  res.status(200).render('landingpage', {
    title: 'Welcome to Yadda Yadda Yadda',
    subtitle: 'Gruppe 2 | Eksamens Project 2.sem',
  });
};

// Sign up
exports.getSignUpForm = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Sign up',
  });
};

// Sign In
exports.getLoginForm = (req, res) => {
  res.status(200).render('signIn', {
    title: 'Sign in',
  });
};

exports.getResendForm = (req, res) => {
  res.status(200).render('resendConfirmationEmail', {
    title: 'Resend Confirmation Email',
  });
};

// Account
exports.account = (req, res) => {
  res.status(200).render('account', {
    title: 'Account',
  });
};

// Admin Panel
exports.adminPanel = (req, res) => {
  res.status(200).render('adminPanel', {
    title: 'Admin Panel',
  });
};

// About Us
exports.about = (req, res) => {
  res.status(200).render('about', {
    title: 'About Us',
  });
};
