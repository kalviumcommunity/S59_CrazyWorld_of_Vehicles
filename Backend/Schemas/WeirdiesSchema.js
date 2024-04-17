const mongoose = require('mongoose')

const weirdy = new mongoose.Schema({
    imgURL: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required : true
    },
    details: {
        type: String,
        required: false
    },
    userName : {
        type : String,
    }
})

const Weirdy = mongoose.model('weirdy', weirdy);

module.exports = Weirdy