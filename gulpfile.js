var gulp        = require('gulp');
var shell       = require('shelljs/global')

gulp.task('install', function() {
  var pkgJson = require(process.env.GULPFILE_HOME + '/package.json')

  for (dep in pgkJson.devDependencies) {
    shell.exec('sudo npm install ' + dep)
  }
})
