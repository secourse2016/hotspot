var express       = require('express');
var bodyParser    = require('body-parser');
var app           = express();

// Export environment vars first thing
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
//Store all HTML files in view folder.

require('./routes')(app);

module.exports = app;
