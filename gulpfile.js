var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var path = require('path');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jsxhint = require('jshint-jsx');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var mainfile = 'ReactVideo.js';

/*Clean distribution folder*/
gulp.task('clean', function(cb) {
	return del(['./dist/**/*.*'], cb);
});
/*JSX hint*/
gulp.task('jshint', function() {
	return gulp.src([path.join('src', '**', '*.js')])
		.pipe(jshint({
			linter: jsxhint.JSXHINT,
			esnext: true
		}))
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});
/*Build JS*/
gulp.task('build-js', ['clean'], function() {
	return browserify({
			entries: path.join('src', mainfile),
			standalone: 'ReactVideo'
		})
		.transform(babelify)
		.bundle()
		.pipe(source(mainfile))
		.pipe(rename({
			basename: 'react-video'
		}))
		.pipe(gulp.dest(path.join('dist', 'js')));
});
/*Minify JS*/
gulp.task('mini-js', ['build-js'], function() {
	return gulp.src([path.join('dist', 'js', '*.js')])
		.pipe(rename({
			basename: 'react-video',
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.join('dist', 'js')));
});
/*Default Task*/
gulp.task('default', ['mini-js']);