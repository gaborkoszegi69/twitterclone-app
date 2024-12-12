const express = require('express');
const crypto = require('node:crypto');
const  addRoutes   = require('./router');
var session = require('express-session');
const {initDatabase} = require('./services/db');
const app = express();
const bodyParser = require('body-parser');
var dotenv = require('dotenv')
const loki = require("lokijs");
dotenv.config()
let userModel =false;
let twitterModel =false;
let db =  false;
let dbtwitter =  false;

app.listen(process.env.PORT, () => {
    console.log('Server is running on port '+process.env.PORT);
});
// parse application/json
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
    extended: true
}));

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded());

initDatabase((err, { db,dbtwitter, userModel,twitterModel}) => {
    if (err) {
        return console.log(err);
    }

    addRoutes(app, db,dbtwitter, userModel,twitterModel);
   // app.listen(process.env.PORT, () => {
    //     console.log('Server is running on port '+process.env.PORT);
    // });
});
