'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');

exports.getYadda = async function (que, sort) {
    if (sort === null) sort = { sort: { name: 1 } };
    try {
        let cs = await mon.retrieve('localhost', 'yyy', Yadda, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
};

exports.delYadda = async function (name) {
    try {
        let cs = await mon.remove('localhost', 'yyy', Yadda, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
};

exports.postYadda = async function (req) {
    let yadda = new Yadda({
        // create obejct in db-format
        username: req.body.username,
        text: req.body.text,
        tags: req.body.tags,
    });
    try {
        let cs = await yadda.save();
        return;
    } catch (e) {
        console.log(e);
    }
};
