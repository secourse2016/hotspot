/**
 * App routes:
 */
   var flights =  require('../flights.json');
   var jwt     = require('jsonwebtoken');
   var express = require('express');
   var path    = require('path');

   module.exports = function(app,mongo) {

    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/codes', function(req, res) {
      var codes =  require('../airports.json');
      res.json( codes );
    });

    /*GET ALL FLIGHTS (DUMMY) */
    app.get('/api/data/flights', function(req, res) {

      res.json( flights );
    });

    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

    /* Middlewear For Secure API Endpoints */
    app.use(function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

      console.log("{{{{ TOKEN }}}} => ", token);

      var jwtSecret = process.env.JWTSECRET;

      // Get JWT contents:
      try
      {
        var payload = jwt.verify(token, jwtSecret);
        req.payload = payload;
        next();
      }
      catch (err)
      {
        console.error('[ERROR]: JWT Error reason:', err);
        res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
      }

    });

};
