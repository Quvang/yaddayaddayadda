'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');

exports.delYadda = async function (req, res, next) {
    let del = { _id: req.body._id }
    let cs = mon.remove(Yadda, del);
    res.redirect('/dashboard');
};

exports.postYadda = async function (req) {
    let yadda = new Yadda({
        // create obejct in db-format
        username: req.body.username,
        text: req.body.text,
        tags: req.body.tags,
        avatar: req.body.avatar
    });
    try {
        let cs = await yadda.save();
        return;
    } catch (e) {
        console.log(e);
    }
};
