App.factory('API', function($http) {
  var otherAirlines = [
	"http://ec2-54-213-214-212.us-west-2.compute.amazonaws.com:3000/#/",
	"http://ec2-54-152-123-100.compute-1.amazonaws.com/#/",
	"http://52.27.150.19/",
	"http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/#/",
	"http://52.90.46.68/#/home",
	"http://52.34.160.140/",
	"http://52.36.195.124/#/",
	"http://www.swiss-air.me/",
	"http://ec2-52-38-101-89.us-west-2.compute.amazonaws.com/",
	"http://52.25.15.124/",
	"http://52.36.250.55/",
	"http://54.187.208.145/",
	"http://sebitsplease.com.s3-website-us-east-1.amazonaws.com/",
	"http://52.58.46.74/",
	"http://ec2-52-90-41-197.compute-1.amazonaws.com/",
	"http://52.38.78.176/",
	"http://54.93.36.94/#/",
	"http://54.191.202.17/",
	"http://54.213.157.185/#/",
	"http://52.28.246.230/#/",
	"http://54.93.116.90/",
	"http://mynksh.com/",
	"http://52.207.211.179/",
	"http://52.32.109.147/",
	"http://54.187.103.196:3000/",
	"http://54.93.74.125/",
	"http://52.36.169.206/",
	"http://ec2-52-91-94-227.compute-1.amazonaws.com/"];


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
        cb(res);
      });
    },

    getOneSecureFromAirlines: function(outFlight, cb) {
			for (var i = 0; i < otherAirlines.length; i++) {
				var URL = otherAirlines[i] + '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + outFlight.class;
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
		getRoundSecure: function(outFlight, inFlight, cb) {
			var URL = '/api/flights/search/' + outFlight.origin + "/" + outFlight.destination + "/" + outFlight.date + "/" + inFlight.date + "/" + outFlight.class;
			var req = {
				method: 'GET',
				url: URL,
				headers: {
					'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
				}
			};

			$http(req).success(function(flightsArray) {
				console.log(flightsArray);
				cb(flightsArray[0], flightsArray[1]);
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
