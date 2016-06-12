'use strict';
const gulp = require('gulp');
const inject = require('gulp-inject');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const concat = require('gulp-concat');
const _ = require('lodash');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const util = require('gulp-util');

const onError = require('../utils/on_error');
const config = require('../config');

let bundler;

function initBundler() {
  let b = browserify({
    entries: config.paths.jsx,
    extensions: ['.jsx'],
    debug: true,
    fullPaths: true,
    cache: {},
    packageCache: {}
  })
  if (!config.env.production) {
    b = watchify(b);
  }
  return b;
}

function buildApp () {
  bundler = bundler || initBundler();
  return bundler
    .bundle()
    .on('error', onError)
    .pipe(source('app.js'))
    .pipe(config.env.production && buffer() || util.noop())
    .pipe(config.env.production && uglify() || util.noop())
    .pipe(gulp.dest(config.paths.dest));
}

module.exports = function bundle() {
  return gulp.src(config.paths.index)
    .pipe(inject(buildApp(), config.inject))
    .pipe(gulp.dest(config.paths.dest));
};

