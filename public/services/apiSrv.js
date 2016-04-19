App.factory('API', function($http) {
  otherAirlines = ['http://ec2-54-213-214-212.us-west-2.compute.amazonaws.com:3000/#/'];
  return {
    getSecure: function(payload, cb) {
      var URL = '/api/flights/search/' + payload.origin + "/" + payload.destination + "/" + payload.date + "/" + payload.class;
      var req = {
        method: 'GET',
        url: URL,
        headers: {
          'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
        }
      }

      $http(req).success(function(res) {
        cb(res);
      });
    },

    getSecureFromAirlines: function(payload, cb) {
			for (var i = 0; i < otherAirlines.length; i++) {
				var URL = otherAirlines[i] + '/api/flights/search/' + payload.origin + "/" + payload.destination + "/" + payload.date + "/" + payload.class;
				var req = {
					method: 'GET',
					url: URL,
					headers: {
						'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
					}
				}

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
