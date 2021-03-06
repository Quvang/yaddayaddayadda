'use strict';
const mon = require('../models/mongooseWrap');
const Yadda = require('../models/Yadda');
const User = require('../models/userModel');

exports.delYadda = async function (req, res) {
  let del = { _id: req.body._id };
  try {
    let cs = await mon.remove(Yadda, del);
    res.redirect('back');
  } catch (e) {
    console.log(e);
  }
};

exports.postYadda = async function (req) {
  //finder #tags
  let tag = req.body.tags; //kan også erstattes med text
  //regex - regel for indhold af hashtag
  let tags = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
  //matcher tags med tag
  let split = tag.split(' ');
  let match = tag.toLowerCase().match(tags);
  //let join = tag.join(", ");

  let yadda = new Yadda({
    // create obejct in db-format
    username: req.body.username,
    text: req.body.text,
    avatar: req.body.avatar,
    tags: split,
    tags: match,
    //tags: join
  });
  try {
    let cs = await yadda.save();
    return;
  } catch (e) {
    console.log(e);
  }
};

exports.replyYadda = async function (req, res) {
  let yadda = new Yadda({
    username: req.body.username,
    text: req.body.text,
    avatar: req.body.avatar,
    reply: req.body.reply,
  });
  let cs = await yadda.save();
  res.redirect('/dashboard');
};

//upsert user
exports.upsertUser = async function (req, change) {
  let chk = { _id: req.user._id };
  let theme = new User({
    theme: change,
  });
  try {
    let cs = await mon.upsert(User, theme, chk);
    return;
  } catch (e) {
    console.log(e);
  }
};
