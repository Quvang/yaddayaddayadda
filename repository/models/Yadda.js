const mongoose = require('mongoose');

const YaddaSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        
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