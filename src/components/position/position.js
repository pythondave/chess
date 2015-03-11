angular.module('dcc.position', ['dcc.board'])
.directive('position', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/position/position.html',
    controller: 'PositionController',
    controllerAs: 'position'
  };
})
.controller('PositionController', function($state, $stateParams) {
  var vm = this;

  vm.positions = [
    { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' },
    { fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' },
    { fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2' },
    { fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2' },
    { fen: 'r2qkb1r/pp2pppp/2bp1n2/6B1/3QP3/2N2N2/PPP2PPP/R3K2R b KQkq - 3 8' }    
  ];

});
