
const {Schema, model} = require('mongoose');

//8.-Creamos el Schema de mi modelo:
const ArticleSchema = Schema({
    //definimos que datos vamos a tener:
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        require: true
    },
    image: {
        type: String,
        default: "default.png"
    },
});

module.exports = model('Article', ArticleSchema, 'articles');