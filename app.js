const express = require('express');
const app = express();
const database = require('./config/database');

// middleware to parse json body...
app.use(express.json());
// middleware to parse regular form requests...
app.use(express.urlencoded({ extended: false }));
// middleware for databse route...
app.use('/database', database);

app.get("/", (req, res) => {
    // Home Page..  
    res.json({ success: true, message: `Hello World!`});
});

app.listen(5000, () => {
    console.log("server is listening on port 5000...");
});

// "nodemon" was installed globally earlier..