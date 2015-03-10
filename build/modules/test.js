/* Tests // *** TODO
*/

module.exports = function (gulp, plugins) {

  gulp.task('test', function () {
    return gulp.src('test.js')
      .pipe(plugins.jasmine());
  });

};