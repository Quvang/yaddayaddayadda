const User = require('../../models/alt/userModel');
const catchAsync = require('../../utils/catchAsync');
// const AppError = require('../utils/appError');

// Home
exports.default = (req, res) => {
  res.status(200).render('alt/landingpage', {
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

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      username: req.body.username,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('alt/account', {
    title: '🔒 | Account',
    user: updatedUser,
  });
});
