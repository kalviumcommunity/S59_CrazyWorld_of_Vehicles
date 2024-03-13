const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    Country:{
        type: String,
        // required : true
    },
    Brand_1:{
        type: String,
        // required : true
    },
    Brand_2:{
        type: String,
        // required : true
    },
    Brand_3:{
        type: String,
        // required : true
    },
    Brand_4:{
        type: String,
        // required : true
    }
})

const Country = mongoose.model('country', brandSchema);

module.exports = Country
