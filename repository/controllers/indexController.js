exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Mads Møller',
        subtitle: 'Assignment Security 2.0 - 2.1',
    });
};

exports.dashboard = function (req, res) {
    res.render('dashboard', {
        title: "You're logged in as " + req.user.name,
        subtitle: 'Welcome to your dashboard',
        user: req.user,
    });
};

exports.test = function (req, res) {
    res.render('test', {
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
