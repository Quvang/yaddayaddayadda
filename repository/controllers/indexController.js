'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');

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

// Resend Confirmation Email
exports.getResendForm = (req, res) => {
  res.status(200).render('resendConfirmationEmail', {
    title: 'Resend Confirmation Email',
  });
};

// Sign In
exports.getLoginForm = (req, res) => {
  res.status(200).render('signIn', {
    title: 'Sign in',
  });
};

// Dashboard
exports.dashboard = async function (req, res) {
  let yadda = await mon.retrieve(Yadda, {}, { sort: { created: -1 } });
  res.render('dashboard', {
    title: 'Dashboard',
    subtitle: 'Welcome to your dashboard',
    user: req.user,
    yaddas: yadda,
  });
};

// Profile
exports.profile = async function (req, res) {
  let onlyUser = { username: req.user.username };
  let yadda = await mon.retrieve(Yadda, onlyUser, { sort: { created: -1 } });
  res.render('profile', {
    title: 'Profile',
    subtitle: 'Welcome to your profile',
    user: req.user,
    yaddas: yadda,
  });
};

// Messages
exports.messages = function (req, res) {
  res.render('messages', {
    title: 'Messages',
    subtitle: 'Messages',
    user: req.user,
  });
};

// Explore
exports.explore = function (req, res) {
  res.render('explore', {
    title: 'Explore',
    subtitle: 'Find User',
    user: req.user,
  });
};

// Admin Panel
exports.moderatorPanel = (req, res) => {
  res.status(200).render('moderatorPanel', {
    title: 'Moderator Panel',
  });
};

// Admin Panel
exports.adminPanel = (req, res) => {
  res.status(200).render('adminPanel', {
    title: 'Admin Panel',
  });
};

// Account Settings
exports.account = (req, res) => {
  res.status(200).render('account', {
    title: 'Account',
  });
};

// About Us
exports.about = (req, res) => {
  res.status(200).render('about', {
    title: 'About Us',
  });
};
