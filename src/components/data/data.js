angular.module('dcc.data', [])
.factory('dataService', function($q, api) {
  var o = {};

  o.addPosition = function(fen) {
    var setData = function(response) {
      console.log('response', response);
    };
    return api.addPosition(fen).then(setData).catch( function(err) { console.log('err', err); } );
  };

  o.getPositionData = function(fen) {
    var setData = function(response) {
      return response.data;
    };
    return api.getPositionForUser(fen).then(setData);
  };

  return o;
})
.factory('api', function($http, configService) {
  // #stateless
  // interacts with the server
  var o = {};

  o.addPosition = function(fen) {
    //*** wip
    var data = { fen: fen };
    var url = 'http://localhost:5000/api/positions';
    console.log(data, url);
    return $http({
      method: 'PUT',
      url: url,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      },
      data: data
    });
  };

  o.getPositionForUser = function(fen) {
    return $http.get('/position-for-user?fen=' + fen);
  };

  return o;
});
