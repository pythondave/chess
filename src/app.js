angular.module('dcc.chess', [
  'ui.router', //external
  'dcc.config',
  'dcc.templates',
  'dcc.position'
])
.config(function($logProvider, $urlRouterProvider, $stateProvider) {
  $logProvider.debugEnabled(false);

  $urlRouterProvider.otherwise('/position');

  $stateProvider
    .state('position', {
      url: '/position?fen',
    });
});
