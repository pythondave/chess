/*
Notes:
  "chessjs" - chess.js -- javascript library for chess logic (no graphics - i.e. no html/css) 
  "boardjs" - chessboard.js -- graphical chess board (no chess logic)
  "nBoard" - nywtonChessboard - angular-chessboard -- angular wrapper for boardjs
  "board" - dcc.board -- board + logic

todo:
  orientation + option (auto / switch)
  latest move + option
*/

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
    controllerAs: 'board',
    scope: {
      fen: '='
    }
  };
})
.controller('BoardController', function($scope, $state, chessjs) {
  var vm = this;

  $scope.$watch('fen', function(fen) {
    if (fen === undefined) return;

    chessjs.load(fen);
    vm.turn = chessjs.turn();
    vm.nBoard.position(fen);
  });

  vm.onDrop = function(source, target, piece, newPos, oldPos, orientation) {
    //if not a valid move, snapback
    if ( !chessjs.move({ from: source, to: target }) ) { return 'snapback'; }
  };

  vm.onSnapEnd = function(source, target, piece) {
    //successful move => change state
    $state.go('position', { fen: chessjs.fen() });
  };
});
