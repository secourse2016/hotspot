App.factory('API', function($http) {
  var otherAirlines = [
	"http://ec2-52-90-41-197.compute-1.amazonaws.com",
  ""];


  return {
    getOneSecure: function(outFlight, cb) {
      var URL = '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + outFlight.class;
      var req = {
        method: 'GET',
        url: URL,
        headers: {
          'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
        }
      };

      $http(req).success(function(res) {
        console.log("res in api", res);
        cb(res);
      });
    },

    getOneSecureFromAirlines: function(outFlight, cb) {
			for (var i = 0; i < otherAirlines.length; i++) {
				var URL = otherAirlines[i] + '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + outFlight.class + "?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw";
				var req = {
					method: 'GET',
					url: URL,
					headers: {
						'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
					}
				};

				$http(req).success(function(res) {
          console.log(res);
					cb(res);
				});
			}
    },
		getRoundSecure: function(outFlight, inFlight, cb) {
			var URL = '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + inFlight.date + "/" + outFlight.class;
			var req = {
				method: 'GET',
				url: URL,
				headers: {
					'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
				}
			};

			$http(req).success(function(res) {
				cb(res);
			});
		},
		getRoundSecureFromAirlines: function(outFlight, inFlight, cb) {
			for (var i = 0; i < otherAirlines.length; i++) {
				var URL = otherAirlines[i] + '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + inFlight.date + "/" + outFlight.class;
				var req = {
					method: 'GET',
					url: URL,
					headers: {
						'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
					}
				};

				$http(req).success(function(res) {
					cb(res);
				});
			}
		},
    postSecure: function() {
      return $http.post('/api/secure/bookings', {
        "wt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
      });
    }
  }
});
