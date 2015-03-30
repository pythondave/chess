angular.module('dcc.dummyServer')
.factory('positionsServerService', function(positionData, helperService) {
  var o = {};
  var helper = helperService;

  o.positionResponse = function(method, url, data, headers) {
    var position;
    var urlParams = helper.getUrlParams(url);
    if (urlParams.fen === 'r2qkb1r/pp3ppp/2bppn2/6B1/3QP3/2N2N2/PPP2PPP/R3K2R w KQkq - 0 9') {
      position = {
        fen: 'r2qkb1r/pp3ppp/2bppn2/6B1/3QP3/2N2N2/PPP2PPP/R3K2R w KQkq - 0 9'
      };
    }
    var json = position;
    return [200, json];
  };
  o.positionForUserResponse = function(method, url, data, headers) {
    var position;
    var urlParams = helper.getUrlParams(url);
    var json = positionData.getPositionForUser(urlParams.fen);
    return [200, json];
  };

  return o;
})
.factory('positionData', function(helperService) {
  var o = {};

  var positionsForUser = [
    { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', myMoves: ['e4'] },
    { fen: 'r2qkb1r/pp3ppp/2bppn2/6B1/3QP3/2N2N2/PPP2PPP/R3K2R w KQkq - 0 9', myMoves: ['0-0-0'] },
    { fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2', myMoves: ['Nf3', 'Nc3'] }
  ];
  
  o.getPositionForUser = function(fen) {
    var o = { fen: fen };

    var p = _.find(positionsForUser, { fen: fen });
    if (p) o.myMoves = p.myMoves;

    return o;
  };

  return o;
});