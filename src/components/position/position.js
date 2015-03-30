angular.module('dcc.position', ['dcc.board'])
.directive('position', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/position/position.html',
    controller: 'PositionController',
    controllerAs: 'position'
  };
})
.controller('PositionController', function($scope, $state, $stateParams, dataService, $window, chessjs) {
  var vm = this;

  vm.positions = [
    { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' },
    { fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' },
    { fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2' },
    { fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2' },
    { fen: 'r2qkb1r/pp2pppp/2bp1n2/6B1/3QP3/2N2N2/PPP2PPP/R3K2R b KQkq - 3 8' },
    { fen: 'r2qkb1r/pp3ppp/2bppn2/6B1/3QP3/2N2N2/PPP2PPP/R3K2R w KQkq - 0 9' }
  ];

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //if fen not valid, prevent state change and go to start position
    var startPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    var fen = toParams.fen || startPositionFen; //use start position if no fen
    var isValidFen = chessjs.validate_fen(fen).valid;
    if (!isValidFen) { event.preventDefault(); $state.go('position', { fen: undefined }); } //change state if fen invalid
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    //get new position data
    vm.fen = toParams.fen;
    dataService.addPosition(toParams.fen);
    //dataService.getPositionData(toParams.fen).then(callback);
  });

  function callback(data) {
    vm.dataLoaded = true;
    vm.myMoves = data.myMoves;
  }
});
