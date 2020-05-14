'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');

exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Gruppe 2',
        subtitle: 'Yadda Yadda Yadda',
    });
};

exports.dashboard = async function (req, res) {
      let yadda = await mon.retrieve(Yadda, {}, { sort: {created: -1 } });
    res.render('dashboard', {
        title: "Dashboard",
        subtitle: 'Welcome to your dashboard',
        user: req.user,
        yaddas: yadda
    });
};

exports.profile = async function (req, res) {
  let onlyUser = {username: req.user.username}
      let yadda = await mon.retrieve(Yadda, onlyUser, { sort: {created: -1 } });

    res.render('profile', {
        title: 'Profile',
        subtitle: 'Welcome to your profile',
        user: req.user,
        yaddas: yadda
    });
};

exports.messages = function (req, res) {
    res.render('messages', {
        title: 'Messages',
        subtitle: 'Messages',
        user: req.user,
    });
};

exports.explore = function (req, res) {
    res.render('explore', {
        title: 'Explore',
        subtitle: 'Find User',
        user: req.user,
    });
};

exports.tags = function (req, res) {
    res.render('tags', {
        title: '#Tags',
        subtitle: 'Explore #tags',
        user: req.user,
    });
};
