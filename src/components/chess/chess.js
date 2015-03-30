angular.module('dcc.chess', [
  'ui.router', //external
  'dcc.config',
  //'dcc.dummyServer', // comment/uncomment this line to switch between real and dummy server *** TODO: figure out how to switch via config
  'dcc.templates',
  'dcc.data',
  'dcc.position'
])
.config(function($logProvider, $urlRouterProvider, $stateProvider) {
  $logProvider.debugEnabled(false);

  $urlRouterProvider.otherwise('/position');

  $stateProvider
    .state('position', { url: '/position?fen' });
})
.directive('chess', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/chess/chess.html',
    controller: 'ChessController',
    controllerAs: 'chess'
  };
})
.controller('ChessController', function() {
  var vm = this;
})
.factory('chessjs', function($window) {
  return new $window.Chess();
});
