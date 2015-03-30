/* Tasks which deploy the production code
*/

module.exports = function (gulp, plugins) {

  /// deploy - push production build to gh-pages
  gulp.task('deploy', function () {
    var options = {
      repo: 'https://github.com/pythondave/chess.git',
      message: 'Updated using "gulp deploy" task' //,
      //user: { name: 'Ryan Randall', email: 'pythondave@gmail.com' }
    };
    plugins.ghPages.publish(__dirname + '/../production', options, function(err) {
      if (err) {
        plugins.util.log(plugins.util.colors.red('Error:'), err);
      } else {
        plugins.util.log(plugins.util.colors.green('Success!'));
      }
    });
  });
  ///

};