(function setupGulp() {

  'use strict';

  let gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine'),
    config = require('./package.json');

  require('coffee-script/register');

  gulp.task('build', () => gulp
      .src([
        'lib/index.js',
        'lib/**/*.js'
      ], {base: 'lib'})
      .pipe(sourcemaps.init())
      .pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .pipe(concat(config.main))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('.'))
  );

  gulp.task('test', ['build', 'pre-test'], () => gulp
    .src(['spec/**/*-spec.coffee'])
    .pipe(jasmine({verbose: true, coffee: true}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}))
  );

  gulp.task('pre-test', () => gulp
    .src(['lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
  );

}());
