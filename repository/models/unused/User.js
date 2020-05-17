const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    theme: {
        type: Boolean,
        default: false,
    },
    following: [],
    created: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;
