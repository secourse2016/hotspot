
var express = require('express');
app     = require('./app/app.js');
// var mongo 	= require('./db.js');



require('./app/routes')(app);


app.listen(80, function(){
  console.log('[OK] => HTTP Server listening on http://localhost:3000');

    require('./db').init('mongodb://localhost:27017/hotspot'); //  I tried putting a call back here bas it didn't work.

});
