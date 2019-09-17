//import the necessary gulp plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    open = require('gulp-open'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    minifyjs = require('gulp-js-minify');


//task clean
gulp.task('clean', function() {
  return del(['./css/*']);
});

gulp.task('browser-sync', function () {
  return browserSync.init({
    open: true,
    port: 3001,
    startPath: 'index.html',
    notify: false,
    server: {
      baseDir: ['.']
    }
  });
});

//task compile: compiles, autoprefix, minimizes and save in /css the final file
gulp.task('compile', function(done) {
  gulp.src('./scss/squad.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['compile']);

  gulp.watch(['index.html', './js/*.js', './scss/*.scss']).on('change', function () {
    reload();
  });

});

gulp.task('start', ['browser-sync', 'compile', 'watch']);

gulp.task('default', ['start']);
