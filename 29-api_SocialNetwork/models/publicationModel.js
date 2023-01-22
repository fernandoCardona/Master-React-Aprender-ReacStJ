//3.3.1-Definimos el Model de publication:
const {Schema, model} = require('mongoose');

const PublicationSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    file: String, 
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Publication', PublicationSchema, 'publications');