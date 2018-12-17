// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// (DATA)
// =============================================================
var tables = [
];

var waitlist = [

];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all characters
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);
        res.json(newReservation);
    } else {
        waitlist.push(newReservation);
        res.json(null)
    }

    
});

// Starts the server to begin listening
// =============================================================

//Clear Tables
app.post("/api/clear", function (req, res){
    for(var i = 0; i < tables.length; i++) {
        tables.shift();
        var reserv = waitlist.shift();
        if(reserv != null) {
            tables.push(reserv);
        }
    }
    return res.sendFile(path.join(__dirname, "tables.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});