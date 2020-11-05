require('dotenv').config();
const express = require('express');
var cors = require('cors')

// instatiate the app
const app = express();

// middleware 
app.use(cors())
app.use(express.urlencoded({ extended: false }));

// base page
app.get('/', function(req, res) {
    res.status(200).send('hello')
});

// url decoder route amazon
app.use('/urlrequest', require('./routes/urlRequest'))

var server = app.listen(process.env.PORT || 3000);

module.exports = server;