const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');

// Tags
exports.tags = async function (req, res) {
  let yadda = await mon.retrieve(Yadda, {}, { sort: { created: -1 } });
  res.render('tags', {
    title: '#tags',
    subtitle: 'Explore #tags',
    user: req.user,
    yaddas: yadda,
  });
};

//find tags
exports.searchTags = async function (req, res) {
  let yadda = await mon.retrieve(Yadda, { tags: req.body.tags }, { sort: { created: -1 } });
  res.render('tags', {
    title: '#tags',
    user: req.user,
    yaddas: yadda,
  });
};
