const express = require('express');
const path = require('path');
const router = express.Router();
  
// Creating instance of express
const app = express();
  
app.use(express.static("images") );
app.use(express.static( "scripts"));
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

app.use('/', router)

// Listening to server at port 3000
app.listen(3000, function () {
    console.log("server started");
})
