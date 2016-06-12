'use strict';

const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const _ = require('lodash');
const scripts = require('./utils/scripts');
const tasks = fs.readdirSync(path.resolve(__dirname, 'tasks')).filter(scripts.filter).map(scripts.name);

module.exports = function () {
  gulp.task('build', _.without(tasks, 'watch'));
  tasks.forEach(function (task) {
    const fn = require(path.resolve(__dirname, 'tasks', task));
    gulp.task(task, fn);
  });
};
