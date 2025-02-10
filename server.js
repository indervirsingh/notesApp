const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const Data = require('./noteSchema')

var recipeApp = express()

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI)
mongoose.connection.once("open", () => {
    console.log("connected to database")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})

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

recipeApp.post("/delete", (req, res) => {
    Data.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed " + err)
    })
    res.send("Deleted!")
})

recipeApp.post("/update", (req, res) => {
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

recipeApp.get("/fetch", (req, res) => {
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})

var server = recipeApp.listen(8081, "localhost", () => {
    console.log("Server is running!");
})