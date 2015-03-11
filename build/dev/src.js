"use strict";
/*
DO NOT EDIT THIS FILE DIRECTLY - it is auto-generated. Instead, edit the source files - see gulpfile for details.
*/

angular.module('dcc.config', [])
.constant('configService', function() {
  var o = { };

  return o;
}());

"use strict";
/*
DO NOT EDIT THIS FILE DIRECTLY - it is auto-generated. Instead, edit the source files - see gulpfile for details.
*/

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

"use strict";
/*
DO NOT EDIT THIS FILE DIRECTLY - it is auto-generated. Instead, edit the source files - see gulpfile for details.
*/

angular.module('dcc.chess')
.controller('MainCtrl', function() {
  var vm = this;
});
"use strict";
/*
DO NOT EDIT THIS FILE DIRECTLY - it is auto-generated. Instead, edit the source files - see gulpfile for details.
*/

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

"use strict";
/*
DO NOT EDIT THIS FILE DIRECTLY - it is auto-generated. Instead, edit the source files - see gulpfile for details.
*/

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsImNvbnRyb2xsZXJzLmpzIiwiY29tcG9uZW50cy9ib2FyZC9ib2FyZC5qcyIsImNvbXBvbmVudHMvcG9zaXRpb24vcG9zaXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGV2L3NyYy5qcyIsInNvdXJjZVJvb3QiOlsiLi4vc3JjL2NvbmZpZy5qcyIsIi4uL3NyYy9hcHAuanMiLCIuLi9zcmMvKiovKi5qcyJdfQ==