App.factory('API', function($http) {
	return {
		getSecure : function(payload) {
			var URL = '/api/flights/search/'+payload.origin+"/"+payload.destination+"/"+payload.date+"/"+payload.class;
			var req = { method: 'GET', url: URL,
 headers: {
   'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
 }
}

$http(req).then(function(){}, function(){});
		},
		postSecure : function() {
			return $http.post('/api/secure/blogs', {
				"wt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTd2lzc0FpcmxpbmVzIiwiaWF0IjoxNDYxMDMxNDEwLCJleHAiOjE0OTI1Njc0MTcsImF1ZCI6Ind3dy5zd2lzc2FpcmxpbmVzLmNvbSIsInN1YiI6ImhvdHNwb3QifQ.1ofRxR5MfGQ1uxojSKVQrr0vIZE7Nb276BcKMSzf5Lw"
			});
		}
	}
});
