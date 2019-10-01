var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var scssFiles = './app/views/src/scss/style.scss';
var cssDest = './app/public/css';
var browserSync = require('browser-sync').create();
var sassDevOptions = {outputStyle: 'expanded'}
var sassProdOptions = {outputStyle: 'compressed'}

gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
        script: 'app.js'
  }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
  });
});

gulp.task('browserSync',gulp.series(['nodemon']), function() {
    browserSync.init(null, {
      proxy: "http://localhost:8000",
      files: ["views/**/*.*"],
      port: 8080,
    });
});

gulp.task('sassdev', function() {
    return gulp.src(scssFiles)
        .pipe(sass(sassDevOptions).on('error', sass.logError))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
});

gulp.task('sassprod', function() {
    return gulp.src(scssFiles)
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
});

gulp.task('watch',gulp.series(['browserSync']),function() {
    gulp.watch(scssFiles, gulp.series(['sassdev', 'sassprod'])).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel(['sassdev', 'sassprod', 'watch']));
