'use strict';

var del = require('del');
var ary = require('lodash').ary;

/**
 * Remove unused directories after a build process.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Function} done - Function to call when asynchrounous stuff is done.
 */
function gulpBuildClean(gulp, plugins, config, done) {
  var task = config.tasks['build.clean'];
  var opt = { cwd: task.cwd || '', nomount: true, strict: true, mark: true };

  del(task.src, opt).then(ary(done, 0)).catch(done);
}

module.exports = [['build.rev.replace'], gulpBuildClean];
