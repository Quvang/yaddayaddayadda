const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');
const saltRounds = 10;

exports.register = function (req, res) {
    res.render('register', {
        title: 'Create a User',
        subtitle: 'Yadda Yadda Yadda',
    });
};

exports.postRegister = function (req, res) {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 12) {
        errors.push({ msg: 'Password must be at least 12 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
        });
    } else {
        User.findOne({ email: email }).then(function (user) {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch((err) => console.log(err));
                });
            }
        });
    }
};

exports.login = function (req, res) {
    res.render('login', {
        title: 'Login',
        subtitle: 'Login Subtitle',
    });
};

exports.postLogin = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};
