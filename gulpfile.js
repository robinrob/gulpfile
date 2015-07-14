var argv = require('yargs').argv
var browserSync = require('browser-sync')
var cloudflare = require('gulp-cloudflare')
var combiner = require('stream-combiner2')
var concat = require('gulp-concat')
var cp = require('child_process')
var gulp = require('gulp')
var haml = require('gulp-ruby-haml')
var ngmin = require('gulp-ngmin')
var path = require('path')
var plumber = require('gulp-plumber')
var prefix = require('gulp-autoprefixer')
var task = require('gulp-task')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var shell = require('shelljs/global')
var uglify = require('gulp-uglifyjs')
var watch = require('gulp-watch')

gulp.task('link', function() {
    var pkgJson = require('./package.json')

    var deps = pkgJson.devDependencies
    for (dep in deps) {
        exec('sudo npm link ' + dep + '@' + deps[dep])
    }
})

var messages = {
  hamlBuild: '<span style="color: grey">Running:</span> $ haml'
};

function onError(err) {
  console.log(err)
  exec('say what the fuck')
}

gulp.task('reload', function () {
  browserSync.reload()
});


gulp.task('browser-sync', function() {
  var open = argv.file || "open"
  browserSync({
    server: {
      baseDir: '.',
      index: open
    },
    browser: "safari",
  });
});

function hamlBuild() {
    return combiner(
        haml(),
        rename(function (path) {
            path.dirname += '/../'
        })
    )
}

gulp.task('haml-watch', function () {
    gulp.src(config.paths.haml.src, {read: false})
        .pipe(plumber({
            onError: onError
        }))
        .pipe(watch(config.paths.haml.src))
        .pipe(hamlBuild())
        .pipe(gulp.dest('./'))
})

gulp.task('haml-build', function () {
    return gulp.src(config.paths.haml.src)
        .pipe(plumber({
            onError: onError
        }))
        .pipe(hamlBuild())
        .pipe(gulp.dest('./'))
})

gulp.task('watch', function () {
  gulp.watch('*.js', reload)
});

gulp.task('default', ['browser-sync', 'watch', 'haml-watch']);
