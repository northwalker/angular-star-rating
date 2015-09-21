/**
 * Created by Northwalker on 15/09/21.
 */
// Load plugins
var gulp = require('gulp'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-ruby-sass'),
  compass = require('gulp-compass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  del = require('del');

var paths = {
  scripts: 'src/js/*.js',
  css:'src/css/*.css',
  sass: 'src/css/**/*.scss',
  images: 'images/*'
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
  gulp.src(paths.css)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }))

});

gulp.task('styles_minify', function() {
  gulp.src(paths.css)
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/min'));
});

gulp.task('scripts_minify', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/min'))
    .pipe(notify({ message: 'Scripts task complete' }));

});


// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify_libraries', function () {
  return gulp.src('js/libraries/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/libraries'));
});

// Images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
  // del(['dist/**/*.css', 'dist/**/*.js', 'dist/images'], cb)
  del(['dist/**/*.js', 'dist/**/*.css'], cb)
});


// Default task
gulp.task('default', ['clean','jshint', 'styles', 'scripts', 'styles_minify', 'scripts_minify', 'images']);
// gulp.task('default', ['clean']);
