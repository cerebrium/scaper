require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
var cors = require('cors')

// instatiate the app
const app = express();

// middleware
app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: false }));

// base page
app.get('/', function(req, res) {
    res.status(200).send('hello')
});

// url decoder route
app.use('/urlrequest', require('./routes/urlRequest'))

var server = app.listen(process.env.PORT || 3000);

module.exports = server;