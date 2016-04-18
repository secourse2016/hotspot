(function(){
   var client = require('mongodb').MongoClient;
    var db;

    module.exports =  {
        init: function(dbURL, callback) {
            client.connect(dbURL, function(err, database) {
              if (err) console.log("[error] mongo connection: ", err);
              console.log('SUCCESS');
              db = database;
              if(callback) callback();
            });
        },
        db: function() {
            return db;
        },
        close: function() {
            db.close();
        },
        insertBooking: function(user){
          var booking =
             {
               "firstName"              :   user.fname,
               "lastName"               :   user.lname,
               "passport"               :   user.passport,
               "passportIssueDate"      :   user.passportIssueDate | date :'EEEE, MMMM d, y',
               "passportExpiryDate"     :   user.passportExpiryDate | date :'EEEE, MMMM d, y',
               "creditCardType"         :   user.ccType,
               "creditCardNumber"       :   user.ccNumber,
               "creditCardExpiryDate"   :   user.ccExpiryDate | date :'EEEE, MMMM d, y',
               "nameOnCreditCard"       :   user.ccName,
               "email"                  :   user.email,
               "country"                :   user.country,
               "address1"               :   user.add1,
               "address2"               :   user.add2,
               "state"                  :   user.state,
               "city"                   :   user.city,
               "contactNumber"          :   user.contactNumber


              //  "flightNumber"  :   user.flightNumber,
              //  "aircraft"      :   flight.aircraft,
              //  "capacity"      :   flight.capacity,
              //  "date"          :   moment().add(i, 'days').calendar(),
              //  "duration"      :   flight.duration,
              //  "origin"        :   _origin,
              //  "destination"   :   _destination,
              //  "seatmap"       :   []
             };
        }
    };



})();
