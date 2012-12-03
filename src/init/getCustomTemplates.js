// Load up grunt and fetch the task dir path
var grunt = require('grunt'),
    paths = require('./paths'),
    initDir = paths.custom,
    files = [];

// If there is a custom dir
if (initDir) {
  // Find the files/dirs that exist in the directory
  files = grunt.file.expandFiles(initDir + '/*.js');
}

// Export the files
module.exports = files;