// Import Express and Mongoose modules
const express = require('express')
const mongoose = require('mongoose')

//Create schema object for server to use, via mongoose 
const Data = require('./noteSchema.js')

//Create a server-object/instance for the app
var recipeApp = express()

// Connect the database via mongoose
mongoose.connect('mongodb://localhost/userStorageDB')

// Feedback handling for mongoose
mongoose.connection.once("open", () => {
    console.log("connected to database");
}).on("error", (error) => {
    console.log("Failed to connect " + error);
})


