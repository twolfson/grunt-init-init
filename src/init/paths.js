// Load in required modules
module.exports = function (grunt) {
var path = require('path');

// Standard path
var gruntPath = require.resolve('grunt'),
    stdDir = path.join(gruntPath, '../../tasks/init');

// Custom path (this will be null if it does not exist)
var customDir = grunt.file.userDir('tasks/init');

// Expose the dirs
return {
  'grunt': gruntPath,
  'standard': stdDir,
  'custom': customDir
};
};