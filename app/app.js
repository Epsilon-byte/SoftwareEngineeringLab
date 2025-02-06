// Imports express.js
const express = require("express");

// Creates express app
var app = express();

// Adds static files location
app.use(express.static("static"));

// Gets the functions in the db.js file to use
const db = require('./services/db');

// Creates a route for root - /
app.get("/", function(req, res) {
    res.send("Hello world!");
});

// Creates a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

//Exercise 5
//Outputs to the browser only the name for the requested id
app.get("/db_test/:id", function(req, res){
    // Gets the id from the URL params
    const id = req.params.id;

    // Modifies the SQL query to select based on the provided id
    const sql = 'SELECT name FROM test_table WHERE id = ?';
    
    // Asks the database to retrieves the id based on the provided id
    // If database id matches with provided id, it will retrieve the name based on the database id
    db.query(sql, [id]).then(results => {
        console.log(results);

        // Checks if results exist and get the name
        const name = results.length > 0 ? results[0].name : 'No data found';

        //Sends a HTML formatted table
        res.send(`
            <html>
            <head>
                <title>Student Info</title>
                <style>
                    table {
                        width: 50%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        font-size: 18px;
                        text-align: left;
                    }
                    th, td {
                        padding: 10px;
                        border: 1px solid black;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h2>Student Information</h2>
                <table>
                    <tr>
                        <th>Name</th>
                    </tr>
                    <tr>
                        <td>${name}</td>
                    </tr>
                </table>
            </body>
            </html>
        `);
    }).catch(err => {
        console.error(err);
        //In case there are any issues, it will send out an error 500 status message
        res.status(500).send("An error occurred while retrieving data.");
    });
});




// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Exercise 2 - Creating a dynamic route for /user/<id>, where the ID can be any ID number
// Responds to a 'GET' request
app.get("/user/:id", function(req, res) {
    console.log(req.params);
    res.send("This is the id: " + req.params.id);
});

// Exercise 3 - Creating a dynamic route for /student/<name>/<id>, where the ID can be any ID number, and the name can be any name.
// app.get("/student/:name/:id", function(req, res) {
    //console.log(req.params);
    //res.send("Hello " + req.params.name + ". This is your id: " + req.params.id);
//})

// Exercise 4 - Outputs the name and ID in an HTML table
app.get("/student/:name/:id", function(req, res) {
    console.log(req.params);

    // Creates an HTML response with a table
    res.send(`
        <html>
        <head>
            <title>Student Info</title>
            <style>
                table {
                    width: 50%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 18px;
                    text-align: left;
                }
                th, td {
                    padding: 10px;
                    border: 1px solid black;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Student Information</h2>
            <table>
                <tr>
                    <th>Name</th>
                </tr>
                <tr>
                    <td>${req.params.name}</td>
                </tr>
            </table>
        </body>
        </html>
    `);
});


// Starts server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});

// Creating a new route path /roehampton which sends text message to the use when they request the url
//app.get("/roehampton", function(req, res) {
    //console.log(req.url)
    //let path = req.url;
    //res.send(path.substring(0,3))
//});


//Additional Task 1
app.get("/roehampton", function(req, res) {
    // Extracts the URL path
    // let is the keyword used to declare a block-scoped variable
    let path = req.url;
    
    // Removes the leading "/" from the URL
    // This is done by slicing/removing the first substring of the path
    let pathWithoutSlash = path.slice(1);
    
    // Reverses the string "roehampton"
    // This is done by splitting the word into characters, reversing the order and then joining them back together
    let reversed = "roehampton".split("").reverse().join("");
    
    // Sends the reversed string as the response
    res.send(reversed);
});

//Additional Task 2
app.get("/number/:n", function(req, res) {
    let i = parseInt(req.params.n, 10); // Converts the parameter to an integer
    let tableHtml = '<table border="1"><tr><th>Number</th></tr>'; // Starts table with a header

    // Creating a loop that will increment by one until it reaches the provided parameter
    // For example, if the user provided a parameter of 5, it will output from 0 to 5
    for (let counter = 0; counter <= i; counter++) {
        tableHtml += `<tr><td>${counter}</td></tr>`; // Add a row for each number
    }

    tableHtml += '</table>'; // Closes the table tag

    res.send(tableHtml); // Sends the table as the response
});

