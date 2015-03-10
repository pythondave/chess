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
