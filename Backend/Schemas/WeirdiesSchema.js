const mongoose = require('mongoose')

const weirdy = new mongoose.Schema({
    ImgURL: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required : true
    },
    Details: {
        type: String,
        required: false
    }
})

const Weirdy = mongoose.model('weirdy', weirdy);

module.exports = Weirdy