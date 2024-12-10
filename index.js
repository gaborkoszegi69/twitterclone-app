const express = require('express');
const crypto = require('node:crypto');
const  addRoutes   = require('./router');
var session = require('express-session');
const {initDatabase} = require('./services/db');
const app = express();
const bodyParser = require('body-parser');
var dotenv = require('dotenv')
dotenv.config()
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

initDatabase((err, { db, userModel,twitterModel}) => {
    if (err) {
        return console.err(err);
    }

    addRoutes(app, db, userModel,twitterModel);
   // app.listen(process.env.PORT, () => {
    //     console.log('Server is running on port '+process.env.PORT);
    // });
});
