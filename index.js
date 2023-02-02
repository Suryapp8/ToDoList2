const express = require("express")
const port = 8000;
const path = require("path")
const app = express()
const db = require("./mongoDB");
const Contact = require("./schema")

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded())
app.use(express.static("home"))


app.get("/" , function(req, res){

    Contact.find({} , function(err, contacts){
        if(err){
            console.log("Error in fetching")
            return
        }
        return res.render("home", {
            title: "Contact List",
            contactList : contacts
        })
    })
    
})

app.post("/contact" , function(req, res){
    Contact.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newContact){
        if(err){
            console.log("Error in fetching")
            return
        }
        console.log(newContact)
        return res.redirect("back")
    })
})


app.get("/delete" , function(req, res){
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting")
            return
        }
    })
    return res.redirect("/")
})


app.listen(port , function(err){
    if(err){
        console.log(`There is an error ${err}`)
    }
    else{
        console.log(`App is live on port ${port}`)
    }
})