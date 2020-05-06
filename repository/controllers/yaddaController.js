'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');

exports.getYadda = async function(que, sort) {
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
        let cs = await mon.remove("localhost", "yyy", Yadda, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.postYadda = async function(req) {
    let chk = { name: req.body.name }; // check object for existence
    let yaddaPost = new yaddaPost({
        // create obejct in db-format
        username: req.body.username,
        avatar: req.body.avatar,
        image: req.body.image,
        text: req.body.text,
        tags: req.body.tags,
        created: req.body.created
    });
    if (req.body.localname === '') city.localname = city.name;
    try {
        let cs = await mon.upsert('localhost', 'yyy', Yadda, city, chk);
        return;
    } catch (e) {
        console.log(e);
    }
};
