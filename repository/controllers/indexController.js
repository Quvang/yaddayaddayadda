exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Gruppe 2',
        subtitle: 'Yadda Yadda Yadda',
    });
};

exports.dashboard = function (req, res) {
    res.render('dashboard', {
        title: "Dashboard",
        subtitle: 'Welcome to your dashboard',
        user: req.user,
    });
};

exports.profile = function (req, res) {
    res.render('profile', {
        title: 'Profile',
        subtitle: 'Welcome to your profile',
        user: req.user,
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
        subtitle: 'Explore',
        user: req.user,
    });
};
