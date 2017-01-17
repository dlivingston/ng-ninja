var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	});
});

gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./src/main.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['browserify']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['connect', 'watch']);