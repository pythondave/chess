"use strict";
/*
DO NOT EDIT THIS FILE DIRECTLY - it is auto-generated. Instead, edit the source files - see gulpfile for details.
*/

angular.module('dcc.config', [])
.constant('configService', function() {
  var o = { };

  return o;
}());

angular.module('dcc.chess', [
  'ui.router', //external
  'dcc.config',
  'dcc.templates',
  'dcc.position'
]);

angular.module('dcc.chess')
.controller('MainCtrl', function($scope) {
  var vm = this;
});
angular.module('dcc.board', ['nywton.chess'])
.config(['nywtonChessboardConfigProvider', function nywtonChessConfigConfig(chessboardProvider) {
  chessboardProvider.pieceTheme('images/chesspieces/wikipedia/{piece}.png');
  chessboardProvider.showNotation = false;
}])
.directive('board', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/board/board.html',
    controller: 'BoardController',
    controllerAs: 'board'
  };
})
.controller('BoardController', function() {
});

angular.module('dcc.position', ['dcc.board'])
.directive('position', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/position/position.html',
    controller: 'PositionController',
    controllerAs: 'position'
  };
})
.controller('PositionController', function() {
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsImNvbnRyb2xsZXJzLmpzIiwiY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImNvbXBvbmVudHMvcG9zaXRpb24vcG9zaXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGV2L3NyYy5qcyJ9