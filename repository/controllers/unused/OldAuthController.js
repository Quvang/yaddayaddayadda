const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');
const saltRounds = 10;

//Fileupload (avatar)
const multer = require('multer');
//Fileupload management (location filename filetype)
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../public/images/avatar/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.body.username}-${Date.now()}.${ext}`);
    },
});

//validation of file is an image
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        // cb(new Error('MAKE ERROR CODE - Not an Image! Please upload imagefiles only', 400), false);
        cb(null, false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

//middleware
exports.uploadAvatar = upload.single('avatar');

exports.register = function (req, res) {
    res.render('register', {
        title: 'Create a User',
        subtitle: 'Yadda Yadda Yadda',
        avatar: req.body.avatar,
    });
};

exports.postRegister = function (req, res) {
    const { username, password, password2, email, firstName, lastName } = req.body;
    let errors = [];

    if (!username || !password || !password2 || !email || !firstName || !lastName) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (username.length < 3) {
        errors.push({ msg: 'Username must be at least 3 characters' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 4) {
        errors.push({ msg: 'Password must be at least 4 characters' });
    }

    if (firstName.length < 2) {
        errors.push({ msg: 'Firstname must be at least 2 characters' });
    }

    if (lastName.length < 2) {
        errors.push({ msg: 'Lastname must be at least 2 characters' });
    }

    var avatar = null;
    if (req.file === undefined) {
        avatar = null;
        // errors.push({ msg: 'Not an Imagefile! Please upload imagefiles only' });
    } else {
        avatar = req.file.filename;
    }
    console.log('\n' + '>>> Avatar filename set to: ' + avatar + ' <<<' + '\n');

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            password,
            password2,
            email,
            firstName,
            lastName,
            // avatar,
        });
    } else if (errors.length > 0) {
        //if email already exists
        User.findOne({ email: email }).then(function (user) {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    username,
                    password,
                    password2,
                    email,
                    firstName,
                    lastName,
                    avatar,
                });
            } else {
                const newUser = new User({
                    username,
                    password,
                    email,
                    firstName,
                    lastName,
                    avatar,
                });

                bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            req.flash('success_msg', 'Confirmation Email sent');
                            res.redirect('/users/login');
                        })
                        .catch((err) => console.log(err));
                });
            }
        });
    } else {
        //if username already exists
        User.findOne({ username: username }).then(function (user) {
            if (user) {
                errors.push({ msg: 'Username already exists' });
                res.render('register', {
                    errors,
                    username,
                    password,
                    password2,
                    email,
                    firstName,
                    lastName,
                    avatar,
                });
            } else {
                const newUser = new User({
                    username,
                    password,
                    email,
                    firstName,
                    lastName,
                    avatar,
                });

                bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            req.flash('success_msg', 'Confirmation Email sent');
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
