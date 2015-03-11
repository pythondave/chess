/*
Notes:
  "chessjs" - chess.js -- javascript library for chess logic (no graphics - i.e. no html/css) 
  "boardjs" - chessboard.js -- graphical chess board (no chess logic)
  "nBoard" - nywtonChessboard - angular-chessboard -- angular wrapper for boardjs
  "board" - dcc.board -- board + logic
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
    controllerAs: 'board'
  };
})
.controller('BoardController', function($scope, $state, $window) {
  var vm = this;

  var chess = new $window.Chess(); //chessjs

  $scope.$on('$stateChangeSuccess', function() {
    //new state => (if fen invalid) set chessjs fen and set nBoard position
    $state.params = $state.params || {};
    var startPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    var fen = $state.params.fen || startPositionFen; //use start position if no fen
    var isValidFen = chess.validate_fen(fen);
    if (!isValidFen) { $state.go('position', { fen: undefined }); } //change state if fen invalid

    chess.load(fen);
    vm.fen = fen;
    vm.turn = chess.turn();
    vm.nBoard.position(fen);
  });

  vm.onDrop = function(source, target, piece, newPos, oldPos, orientation) {
    //if not a valid move, snapback
    if ( !chess.move({ from: source, to: target }) ) { return 'snapback'; }
  };

  vm.onSnapEnd = function(source, target, piece) {
    //successful move => change state
    $state.go('position', { fen: chess.fen() });
  };
});
