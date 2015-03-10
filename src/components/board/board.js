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
