const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/mongoDB")

const db = mongoose.connection

db.on("err" , console.error.bind(console, "error in connection"))

db.once("open" , function(){
    console.log("connected")
})