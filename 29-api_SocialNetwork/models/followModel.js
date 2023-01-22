//3.2.1-Definimos el Model de follow:
const {Schema, model} = require('mongoose');

const FollowSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    followed: {
        type: Schema.ObjectId,
        ref: 'User'
    }, 
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Follow', FollowSchema, 'follows');