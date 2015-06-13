require('shelljs/global')
var gulp        = require('gulp');
var browsersync = require('browser-sync');
var reload      = browsersync.reload
var watch       = require('gulp-watch');
var haml        = require('gulp-ruby-haml');
var changed     = require('gulp-changed');
var runsequence = require('run-sequence')
var gcallback = require('gulp-callback')
var plumber = require('gulp-plumber')
var argv = require('yargs').argv

var messages = {
  hamlBuild: '<span style="color: grey">Running:</span> $ haml'
};

function onError(err) {
  console.log(err)
  exec('say what the fuck')
}

gulp.task('reload', function () {
  browsersync.reload()
});


gulp.task('browser-sync', function() {
  var open = argv.file || "open"
  console.log("open: " + open)
  browsersync({
    server: {
      baseDir: '.',
      index: open
    },
    browser: "safari",
  });
});

// Watch for changes in Haml files
gulp.task('haml-watch', function() {
  var dest = '.'
  gulp.src('./*.haml').
    pipe(plumber({
      onError: onError
    })).
    pipe(watch('./*.haml')).
    pipe(changed(dest, {extension: '.html'})).
    pipe(haml()).
    pipe(gulp.dest(dest)).
    pipe(gcallback(function() {
        console.log("HAML DONE")
        reload()
      }))
})

gulp.task('haml', function() {
  var glob = argv.file || './*.haml'
  var dest = '.'
  gulp.src(glob).
    pipe(plumber({
      onError: onError
    })).
    pipe(haml()).
    pipe(gulp.dest(dest)).
    pipe(gcallback(function() {
        console.log("HAML DONE")
        reload()
      }))
})

// gulp.task('reload', function() {
//   reload()
// })

gulp.task('watch', function () {
  gulp.watch('*.js', reload)
});

gulp.task('default', ['browser-sync', 'watch', 'haml-watch']);
