'use strict';
/*
 * wrapper for CRUD functionality of a mongodb with mongoose
 */
const mongoose = require('mongoose');
// mongoose.set('debug', true);
// mongoose.set('debug', { color: false });

const conparam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

//Retrieve
exports.retrieve = async function (obj, query, sort) {
    let stuff = null;
    try {
        stuff = await obj.find(query, null, sort);
    } catch (err) {
        console.log(error);
    } finally {
        return stuff;
    }
};

//Upsert
exports.upsert = async function (obj, query, chk) {
    let stuff = null;
    let newquery = query.toObject();
    delete newquery._id;
    try {
        stuff = await obj.updateOne(newquery, {
            upsert: true,
        });
    } catch (err) {
        console.log(error);
    } finally {
        return stuff;
    }
};

//Remove
exports.remove = async function (obj, name) {
    let stuff = null;
    try {
        stuff = await obj.deleteOne(name, (err) => {});
        console.log('Successful deletion');
    } catch (err) {
        console.log(error);
    } finally {
        return stuff;
    }
};
