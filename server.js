// Import Express and Mongoose modules
const express = require('express')
const mongoose = require('mongoose')

//Create schema object for server to use, via mongoose 
const Data = require('./noteSchema')

//Create a server-object/instance for the app
var recipeApp = express()

// Connect the database via mongoose
mongoose.connect('mongodb://localhost/userStorageDB')

// Feedback handling for mongoose
mongoose.connection.once("open", () => {
    console.log("connected to database")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})


// Create a note
//POST request
recipeApp.post("/create", (req, res) => {

    var note = new Data ({

        title: req.get("title"),
        date: req.get("date"),
        photo: req.get("photo"),
        ingredients: req.get("ingredients"),
        recipe: req.get("recipe"),
        summary: req.get("summary"),

    })

    note.save().then(() => {

        if (note.isNew == false) {
            console.log("Saved data")
            res.send("Saved data")
        } else {
            console.log("Failed to save data")
        }
    })

})

// Delete a note
//POST request

// Update a note
//POST request


// Fetch all notes
//GET request


// http://192.168.1.102:8081/create
var server = recipeApp.listen(8081, "192.168.1.102", () => {
    console.log("Server is running!");
})