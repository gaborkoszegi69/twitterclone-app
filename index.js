const express = require('express');
const  addRoutes   = require('./router');

const app = express();

addRoutes(app);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});