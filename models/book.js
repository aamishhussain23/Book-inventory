const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    author : {
        type : String,
        required : true
    },
    isbn : {
        type : String,
        required : true,
        unique : true
    },
    genre : {
        type : String,
        required : true,
    },
    publicationYear : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'bookUserCollection',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const bookCollection = new mongoose.model('bookCollection', bookSchema)

module.exports = bookCollection