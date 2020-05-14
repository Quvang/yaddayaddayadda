const mongoose = require('mongoose');

const YaddaSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: null,
    },

    text: {
        type: String,
        required: true,
    },

    tags: {
        type: [String],
        default: null,
    },

    avatar: {
        type: String
    },

    reply: {
        type: String,
        default: null,
    },

    created: {
        type: Date,
        default: Date.now,
    },
});

const Yadda = mongoose.model('Yadda', YaddaSchema, 'yadda');

module.exports = Yadda;
