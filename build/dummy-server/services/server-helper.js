angular.module('dcc.dummyServer')
.factory('helperService', function() {
  var o = {};
  o.camelCase = function(name) {
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    var fn = function(_, separator, letter, offset) { return offset ? letter.toUpperCase() : letter; };
    return name.replace(SPECIAL_CHARS_REGEXP, fn).replace(MOZ_HACK_REGEXP, 'Moz$1');
  };
  o.deserializeParams = function(params, paramNameFunction, paramValueFunction) { //see https://github.com/pythondave/th-admin/issues/11
    if (params === undefined) return {};
    paramNameFunction = paramNameFunction || angular.identity;
    paramValueFunction = paramValueFunction || angular.identity;
    var pairs = params.replace(/^\?/,'').split('&'); //array of pairs of params
    var o = {}, len = pairs.length, i = 0, pair, paramName, paramValue;
    for (;i<len;i++) {
      if (!pairs[i]) { continue; }
      pair = pairs[i].split('=');
      paramName = paramNameFunction(pair[0]);
      paramValue = paramValueFunction(pair[1].replace(/\+/g, ' '));
      o[paramName] = paramValue;
    }
    return o;
  };
  o.getUrlParams = function(url) {
    var match, regex = /[?&]([^=#]+)=([^&#]*)/g, params = {};
    while ((match = regex.exec(url))) { params[match[1]] = match[2]; }
    return params;
  };
  return o;
});