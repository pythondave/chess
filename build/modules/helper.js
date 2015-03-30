/* Helper functions (for gulpfile.js)
*/

module.exports = function(plugins, _) {
  var o = {};

  o.transformPkg = function(pkg) {
    //applies transformations to pkg object
    pkg.paths = this.propagateBases(pkg.paths);
    return pkg;
  };

  o.propagateBases = function(o) {
    //if 'base' is a property of any node in o, base's value is prepended to the leaves of all other children
    var base;
    plugins.traverse(o).forEach(function (node) {
      if (node.base) this.pre(function() { base = node.base; }); //capture base
      if (base && this.isLeaf && this.key != 'base') this.update(base + '/' + node); //prepend to leaves of children
      if (node.base) this.post(function() { base = undefined; }); //clear base
    });
    return o;
  };

  o.standardDelCallback = function (err, deletedFiles) {
    plugins.util.log(plugins.util.colors.magenta('Files deleted:'), deletedFiles.join(', '));
  };

  o.standardNcpCallback = function (err) {
    if (err) {
      plugins.util.log(plugins.util.colors.red('ncp error', err));
    } else {
      plugins.util.log(plugins.util.colors.magenta('Folder copied'));
    }
  };

  o.getFilename = function(str) {
    //examples: getFilename('a/b.c') -> b.c; getFilename('a\b.c') -> b.c
    return str.split('\\').pop().split('/').pop();
  };

  o.getFilenames = function(c) {
    return _.map(c, o.getFilename);
  };

  return o;
};