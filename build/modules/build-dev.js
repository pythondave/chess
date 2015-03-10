/* Tasks which build the dev application (from third-party and src)
  Notes:
    - all paths are relative to gulpfile.js
*/

module.exports = function (gulp, plugins, pkg, helper) {
  var standardDelCallback = helper.standardDelCallback;
  var standardNcpCallback = helper.standardNcpCallback;

  ///main tasks
  gulp.task('build-dev', ['build-dev-third-party', 'build-dev-src']); // (re-)builds everything (in the dev folder)
  gulp.task('build-dev-third-party', ['build-dev-third-party-js', 'build-dev-third-party-css']); // builds everything which comes from third-party
  gulp.task('build-dev-src', ['build-dev-src-images', 'build-dev-src-html', 'build-dev-src-html-templates-js',
    'build-dev-src-js', 'build-dev-src-css']); // builds everything which comes from src
  ///

  ///third-party-js
  gulp.task('clean-dev-third-party-js', function () {
    return plugins.del(pkg.paths.dev.thirdPartyJs, standardDelCallback);
  });

  gulp.task('build-dev-third-party-js', ['clean-dev-third-party-js'], function () {
    plugins.util.beep();
    return gulp.src(pkg.paths.thirdParty.js)
      .pipe(plugins.concat(pkg.paths.dev.thirdPartyJs))
      .pipe(plugins.replace(/\n\/\/# sourceMappingURL=.*\n/g, '\n')) //remove sourceMappingURL lines
      .pipe(plugins.header('//"use strict";\n/*\n' + pkg.messages.buildWarning + '\n*/\n\n'))
      .pipe(gulp.dest('.'));
  });
  ///

  ///third-party-css
  gulp.task('clean-dev-third-party-css', function () {
    return plugins.del(pkg.paths.dev.thirdPartyCss, standardDelCallback);
  });

  gulp.task('build-dev-third-party-css', ['clean-dev-third-party-css'], function () {
    plugins.util.beep();
    return gulp.src(pkg.paths.thirdParty.css)
      .pipe(plugins.concat(pkg.paths.dev.thirdPartyCss))
      .pipe(plugins.header('/*\n' + pkg.messages.buildWarning + '\n*/\n\n'))
      .pipe(gulp.dest('.'));
  });
  ///  

  ///src-images
  gulp.task('clean-dev-src-images', function () {
    plugins.rimraf.sync(pkg.paths.dev.images);
    plugins.util.log(plugins.util.colors.magenta('Folder deleted:'), pkg.paths.dev.images);
  });

  gulp.task('build-dev-src-images', ['clean-dev-src-images'], function () {
    plugins.util.beep();
    return plugins.ncp(pkg.paths.src.images, pkg.paths.dev.images, standardNcpCallback);
  });
  ///

  ///src-html
  gulp.task('clean-dev-src-html', function () {
    return plugins.del(pkg.paths.dev.defaultHtml, standardDelCallback);
  });

  gulp.task('build-dev-src-html', ['clean-dev-src-html'], function () {
    plugins.util.beep();
    return gulp.src(pkg.paths.src.defaultHtml)
      .pipe(plugins.header('<!-- ' + pkg.messages.buildWarning + '-->\n\n'))
      .pipe(plugins.rename(pkg.paths.dev.defaultHtml))
      .pipe(gulp.dest('.'));
  });
  ///

  ///src-html-templates
  gulp.task('clean-dev-src-html-templates-js', function () {
    return plugins.del(pkg.paths.dev.srcHtmlTemplates, standardDelCallback);
  });

  gulp.task('build-dev-src-html-templates-js', ['clean-dev-src-html-templates-js'], function () {
    //converts html partials to js
    plugins.util.beep();
    return gulp.src(pkg.paths.src.htmlTemplates)
      .pipe(plugins.angularTemplatecache({ module: 'dcc.templates', filename: pkg.paths.dev.srcHtmlTemplates, standalone: true }))
      .pipe(gulp.dest('.'));
  });
  ///

  ///src-js
  gulp.task('clean-dev-src-js', function () {
    return plugins.del(pkg.paths.dev.srcJs, standardDelCallback);
  });

  gulp.task('lint-src-js', function() {
    return gulp.src(pkg.paths.src.js)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default', { verbose: true }));
  });

  gulp.task('build-dev-src-js', ['clean-dev-src-js', 'lint-src-js'], function () {
    plugins.util.beep();
    return gulp.src(pkg.paths.src.js)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat(pkg.paths.dev.srcJs))
      .pipe(plugins.header('"use strict";\n/*\n' + pkg.messages.buildWarning + '\n*/\n\n'))
      .pipe(plugins.sourcemaps.write({includeContent: false}))
      .pipe(gulp.dest('.'));
  });
  ///

  ///src-css
  gulp.task('clean-dev-src-css', function () {
    return plugins.del(pkg.paths.dev.srcCss, standardDelCallback);
  });

  gulp.task('build-dev-src-css', ['clean-dev-src-css'], function () {
    plugins.util.beep();
    return gulp.src(pkg.paths.src.css)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({errLogToConsole: true}))
      .pipe(plugins.concat(pkg.paths.dev.srcCss))
      .pipe(plugins.autoprefixer(["last 2 versions", "> 5%"]))
      .pipe(plugins.header('/*\n' + pkg.messages.buildWarning + '\n*/\n\n'))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest('.'));
  });
  ///
};