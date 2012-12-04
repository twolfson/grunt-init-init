// Load up grunt and fetch the task dir path
module.exports = function (grunt) {
  var paths = require('./paths')(grunt),
      initDir = paths.custom,
      files = [];

  // If there is a custom dir
  if (initDir) {
    // Find the files/dirs that exist in the directory
    files = grunt.file.expandFiles(initDir + '/*.js');
  }

  // Export the files
  return files;
};