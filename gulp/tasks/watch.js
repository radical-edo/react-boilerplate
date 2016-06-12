'use strict';
const gulp = require('gulp');
const watch = require('gulp-watch');
const config = require('../config');
const _ = require('lodash');

function run(task) {
  return function () {
    gulp.start(task);
  };
}

module.exports = function () {
  gulp.start('build');
  watch(config.paths.watchApp, run('bundle'));
  watch(config.paths.watchStyles, run('bundle'));
  watch(config.paths.watchAssets, run('assets'));
};
