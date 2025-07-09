// Import Express and Mongoose modules
const express = require('express')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')

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



// ROUTES

// Create a note
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

// Define rate limiter for the /delete route
const deleteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many delete requests from this IP, please try again later."
});

// Delete a note
recipeApp.post("/delete", deleteLimiter, (req, res) => {

    // Use database object which is connected to mongodb via mongoose to search database and delete the one requested by user
    Data.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed " + err)
    })
    res.send("Deleted!")
})

// Define rate limiter for the /update route
const updateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many update requests from this IP, please try again later."
});

// Update a note
recipeApp.post("/update", updateLimiter, (req, res) => {

    // (_id, updated Note information, error Message)
    Data.findByIdAndUpdate({
        _id: req.get("id"),
    }, {
        title: req.get("title"),
        date: req.get("date"),
        photo: req.get("photo"),
        ingredients: req.get("ingredients"),
        recipe: req.get("recipe"),
        summary: req.get("summary")

    }, (err) => {
        console.log("Failed to update " + err)
    })

    res.send("Updated!")
})

// Define rate limiter for the /fetch route
const fetchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

// Fetch all notes
recipeApp.get("/fetch", fetchLimiter, (req, res) => {

    // Searches through all of the notes/objects in database then sends them back
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})


// Start server @ http://localhost:8081/create
var server = recipeApp.listen(8081, "localhost", () => {
    console.log("Server is running!");
})