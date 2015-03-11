/*
  Steps to build and watch:

    1. cmd
    2. cd c:\inetpub\wwwroot\chess\build
    3. gulp

  Common tasks:

    - gulp                        //(default) builds dev and watches for subsequent changes
    - gulp build-production       //builds production from built dev code
    - gulp deploy                 //pushes built production code to gh-pages
*/

/// require and init
var _ = require('lodash');
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var pkg = require('../package.json');
var plugins = loadPlugins({ pattern: ['*'] });
var helper = require('./modules/helper')(plugins);
var test = require('./modules/test')(gulp, plugins);
var buildDev = require('./modules/build-dev')(gulp, plugins, pkg, helper);
var buildProduction = require('./modules/build-production')(gulp, plugins, pkg, helper);
var deploy = require('./modules/deploy')(gulp, plugins);
pkg = helper.transformPkg(pkg);
///

/// watch and default tasks
gulp.task('watch', function() {
  gulp.watch(pkg.paths.thirdParty.js, ['build-dev-third-party-js']);
  gulp.watch(pkg.paths.thirdParty.css, ['build-dev-third-party-css']);
  gulp.watch(pkg.paths.src.images, ['build-dev-src-images']);
  gulp.watch(pkg.paths.src.defaultHtml, ['build-dev-src-html']);
  gulp.watch(pkg.paths.src.htmlTemplates, ['build-dev-src-html-templates-js']);
  gulp.watch(pkg.paths.src.js, ['build-dev-src-js']);
  gulp.watch(pkg.paths.src.css, ['build-dev-src-css']);
});
gulp.task('default', ['build-dev', 'watch']);
///