//3.1.1-Definimos el Model de user:
const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: 'role_user'
    },
    avatarImg: {
        type: String,
        default: 'default.png'
    },
    bio: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', UserSchema, 'users');