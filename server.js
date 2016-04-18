var express = require('express');
var app     = express();
// var mongo 	= require('./db.js');



require('./app/routes')(app);


app.listen(3000, function(){
  console.log('[OK] => HTTP Server listening on http://localhost:3000');

    require('./db').init('mongodb://localhost:27017/hotspot'); //  I tried putting a call back here bas it didn't work.

});
