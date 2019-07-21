//#region initializers
var express = require("express"); // main componenet of E in MEAN
var session = require("express-session"); // creating session for non confidential info storage
var path = require("path"); // getting path for file access
var bodyParser = require("body-parser"); // getting form data via get.post (req.data returns JSON object)
var app = express(); // initializing express
const axios = require("axios"); // used for api requests. See SWAPI project
const server = app.listen(6789); // creating server port
const io = require("socket.io")(server); // opening server
const flash = require("express-flash") // flash message for displaying errors to the users

require("./server/config/mongoose.js");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // get.post related
app.use(express.static(path.join(__dirname, "./public/dist/public"))); // creating directory to static folder
app.use(session({
    secret: "keyboardkitten",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
})) // initializing session
app.use(flash()); // initializing flash message
//#endregion

require("./server/config/routes.js")(app);

// this route will be triggered if any of the routes above did not match
app.all("*", (req, res, next) =>{
    res.sendFile(path.resolve("./public/dist/public/index.html"));
})