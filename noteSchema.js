var mongoose = require('mongoose')
var Schema = mongoose.Schema

var note = new Schema({

    title: String,
    date: String,
    photo: String,
    ingredients: String,
    recipe: String,
    summary: String,
    
})

const Data = mongoose.model("data", note)

module.exports = Data