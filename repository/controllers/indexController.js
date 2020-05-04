exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Gruppe 2',
        subtitle: 'Yadda Yadda Yadda',
    });
};

exports.dashboard = function (req, res) {
    res.render('dashboard', {
        title: "You're logged in as " + req.user.username,
        subtitle: 'Welcome to your dashboard',
        user: req.user,
    });
};

exports.test = function (req, res) {
    res.render('profile', {
        title: 'Test',
        subtitle: 'Test Subtitle',
        user: req.user,
    });
};

exports.about = function (req, res) {
    res.render('about', {
        title: 'About',
        subtitle: 'About Subtitle',
        user: req.user,
    });
};
