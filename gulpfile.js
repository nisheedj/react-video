var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsxhint = require('jshint-jsx');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var inputFileName = 'ReactVideoPlayer.js';
var outputFileName = 'react-video-player';

/*Clean distribution folder*/
gulp.task('clean', function(cb) {
  return del(['./dist/**/*.*'], cb);
});
/*JSX hint*/
gulp.task('jshint', ['clean'], function() {
  return gulp.src([path.join('src', 'js', '**', '*.js')])
    .pipe(jshint({
      linter: jsxhint.JSXHINT,
      esnext: true
    }))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});
/*Build JS*/
gulp.task('build-js', ['jshint'], function() {
  return browserify({
      entries: path.join('src', 'js', inputFileName),
      standalone: 'ReactVideoPlayer'
    })
    .transform(babelify)
    .bundle()
    .pipe(source(inputFileName))
    .pipe(rename({
      basename: outputFileName
    }))
    .pipe(gulp.dest(path.join('dist', 'js')));
});
/*Minify JS*/
gulp.task('mini-js', ['build-js'], function() {
  return gulp.src([path.join('dist', 'js', '*.js')])
    .pipe(rename({
      basename: outputFileName,
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.join('dist', 'js')));
});
/*Build CSS*/
gulp.task('build-css', ['clean'], function() {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

/*Build CSS*/
gulp.task('build-img', ['clean'], function() {
  gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./dist/img'));
});

/*Default Task*/
gulp.task('default', ['mini-js', 'build-css','build-img']);
