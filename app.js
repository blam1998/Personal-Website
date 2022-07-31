const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;

// Creating instance of express
const app = express();

let arr = [];

//app.use(express.json());
app.use(express.static("images") );
app.use(express.static("scripts"));
app.use(express.static("css"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname,"views"));

// Handling GET / Request

router.get("/", (req,res) => {
    res.render("Home");
})

router.get("/Foods",(req,res) =>{
    res.render("Foods")
})

router.post("/", async (req,res) =>{
    //TO-DO: generalize a function to return a Dictionary
    fs.readFile(__dirname+'/html/Home.html','utf-8',function(err,data){
        let buffer = "";
        let decoder = new StringDecoder('utf-8');
        let obj = {};

        req.on('data',function(data){
            buffer += decoder.write(data);
        });
        req.on('end',function(){
            buffer += decoder.end();
            obj = JSON.parse(buffer);
            console.log(obj);
        })
    })
})

app.use('/', router)

// Listening to server at port 3000
app.listen(3000, function () {
    console.log("server started");
})

