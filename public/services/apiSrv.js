App.factory('API', function($http) {

var token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw";
  return {
    getOneSecure: function(outFlight, cb) {
      var URL = '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + outFlight.class;
      var req = {
        method: 'GET',
        url: URL,
        headers: {
          'x-access-token': token
        }
      };

      $http(req).success(function(res) {
        console.log("res in api", res);
        cb(res);
      });
    },

    getOneSecureFromAirlines: function(outFlight, cb) {
				var URL = '/api/flights/searchOtherAirlines/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + outFlight.class + "?wt=" + token;
				var req = {
					method: 'GET',
					url: URL,
					headers: {
						'x-access-token': token
          					}
				};

				$http(req).success(function(res) {
          console.log("res in getOneSecureFromAirlines", res);
					cb(res);
				});

    },
		getRoundSecure: function(outFlight, inFlight, cb) {
			var URL = '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + inFlight.date + "/" + outFlight.class;
			var req = {
				method: 'GET',
				url: URL,
				headers: {
					'x-access-token': token
				}
			};

			$http(req).success(function(res) {
				cb(res);
			});
		},
		getRoundSecureFromAirlines: function(outFlight, inFlight, cb) {
				var URL = '/api/flights/searchOtherAirlines/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + inFlight.date + "/" + outFlight.class + "?wt=" + token;
				var req = {
					method: 'GET',
					url: URL,
					headers: {
						'x-access-token': token
					}
				};

				$http(req).success(function(res) {
          console.log("res in getRoundSecureFromAirlines", res);
					cb(res);
				});
		},
    postSecure: function() {
      return $http.post('/api/secure/bookings', {
        "wt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
      });
    }
  }
});
