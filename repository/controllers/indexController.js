'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');
const User = require('../models/userModel');
const ydc = require('../controllers/yaddaController');

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

// Userprofile
exports.userProfile = async function (req, res) {
  let yaddaUser = { username: req.body.yaddaUsername };
  let isFollowing = { following: req.body.yaddaUsername };
  let getUser = await mon.retrieve(User, yaddaUser);
  let following = await mon.retrieve(User, isFollowing);
  let yadda = await mon.retrieve(Yadda, yaddaUser, { sort: { created: -1 } });
  // console.log('------getUser----\n' + getUser + '\n------getUser----');
  // console.log('------following----\n' + following + '\n------follwing----');

  res.render('userProfile', {
    title: 'Profile',
    subtitle: 'Welcome to .... profile',
    user: req.user,
    yaddas: yadda,
    userData: getUser,
    followers: following,
  });
};

// // followers
// exports.isFollowing = async function (req, res) {
//   let isFollowing = { following: req.body.yaddaUsername };

//   let getUser = await mon.retrieve(User, isFollowing, { sort: { created: -1 } });

//   res.render('userProfile', {
//     title: 'Profile',
//     subtitle: 'Welcome to .... profile',
//     user: req.user,
//     yaddas: yadda,
//     getUserData: getUser,
//   });
// };

//update Theme
exports.dtheme = function (req,res) {
  res.json(req.user);
};

exports.getTheme = async function (req, res) {
  if (req.user.dtheme) {
    var change = true;
  } else {
    var change = false;
  }
  let users = await ydc.upsertUser(req, change);
  res.redirect(req.get("referer"));
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
