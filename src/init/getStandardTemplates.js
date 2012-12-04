// Load up grunt and fetch the task dir path
module.exports = function (grunt) {
  var paths = require('./paths')(grunt),
      initDir = paths.standard,
      templates = grunt.file.expandFiles(initDir + '/*.js');

  // Export the the standard templates
  return templates;
};