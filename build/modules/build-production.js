/* Tasks which build the production application (from dev)
  Notes:
    - all paths are relative to gulpfile.js
*/

module.exports = function (gulp, plugins, pkg, helper) {
  var standardDelCallback = helper.standardDelCallback;
  var standardNcpCallback = helper.standardNcpCallback;

  ///main tasks
  gulp.task('build-production', [
    'build-production-images', 'build-production-html', 'build-production-js', 'build-production-css']);
  ///

  ///images
  gulp.task('clean-production-images', function () {
    plugins.rimraf.sync(pkg.paths.production.images);
    plugins.util.log(plugins.util.colors.magenta('Folder deleted:'), pkg.paths.production.images);
  });

  gulp.task('build-production-images', ['clean-production-images'], function () {
    plugins.util.beep();
    return plugins.ncp(pkg.paths.dev.images, pkg.paths.production.images, standardNcpCallback);
  });
  ///

  ///html
  gulp.task('clean-production-html', function () {
    return plugins.del(pkg.paths.production.defaultHtml, standardDelCallback);
  });

  gulp.task('build-production-html', ['clean-production-html'], function () {
    plugins.util.beep();
    return gulp.src(pkg.paths.dev.defaultHtml)
      .pipe(plugins.replace(/\n.*third-party.css.*(\r\n|\r|\n)/g, ''))
      .pipe(plugins.replace(/\n.*third-party.js.*(\r\n|\r|\n)/g, ''))
      .pipe(plugins.replace(/\n.*src-html-templates.js.*(\r\n|\r|\n)/g, ''))
      .pipe(plugins.replace(/src.css/g, 'app.min.css'))
      .pipe(plugins.replace(/src.js/g, 'app.min.js'))
      .pipe(plugins.rename(pkg.paths.production.defaultHtml))
      .pipe(gulp.dest('.'));
  });
  ///

  ///js
  gulp.task('clean-production-js', function () {
    return plugins.del(pkg.paths.production.js, standardDelCallback);
  });

  gulp.task('build-production-js', ['clean-production-js'], function () {
    plugins.util.beep();
    return gulp.src([ pkg.paths.dev.thirdPartyJs, pkg.paths.dev.srcJs, pkg.paths.dev.srcHtmlTemplates ])
      .pipe(plugins.concat(pkg.paths.production.js))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.stripDebug())
      .pipe(plugins.uglify())
      //.pipe(plugins.gzip()) //*** TODO
      .pipe(gulp.dest('.'));
  });
  ///

  ///css
  gulp.task('clean-production-css', function () {
    return plugins.del(pkg.paths.production.css, standardDelCallback);
  });

  gulp.task('build-production-css', ['clean-production-css'], function () {
    plugins.util.beep();
    return gulp.src([ pkg.paths.dev.thirdPartyCss, pkg.paths.dev.srcCss ])
      .pipe(plugins.concat(pkg.paths.production.css))
      .pipe(plugins.minifyCss({ keepSpecialComments: false }))
      .pipe(gulp.dest('.'));
  });
  ///
};