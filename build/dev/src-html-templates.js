angular.module("dcc.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("components/board/board.html","<div class=\"container\">\r\n  <div class=\"cf\">\r\n    <div class=\"example board board-sm\">\r\n      <nywton-chessboard data-board=\"boardB\"\r\n        data-position=\"\'r1bqkbnr/p1pp1ppp/4p3/1p6/6P1/2NP4/PPP1PP1P/R1BQKBNR w KQkq - 0 1\'\"\r\n        draggable=\"true\" show-notation=\"false\" data-nywton-allow-only-legal-moves></nywton-chessboard>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("components/position/position.html","<div>\r\n\r\n  <board></board>\r\n\r\n</div>");}]);