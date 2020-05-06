const mongoose = require('mongoose');

const YaddaSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {

    },
    image: {

    },
    text: {
        type: String,
        required: true
    },
    tags: [],
    reply: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Yadda = mongoose.model('Yadda', YaddaSchema, 'yadda');

module.exports = Yadda;
