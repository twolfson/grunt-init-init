// Load in grunt
var grunt = require('grunt'),
    paths = require('./paths'),
    customDir = paths.custom,
    stdDir = paths.standard,
    expandFiles = grunt.file.expandFiles;

// Define a helper to find custom and standard template files
function resolveTemplateFiles(name) {
  // Create paths for resolving
  var customFile = customDir + '/' + name + '.js',
      customTemplateDir = customDir + '/' + name + '/**/*',
      stdFile = stdDir + '/' + name + '.js',
      stdTemplateDir = stdDir + '/' + name + '/**/*';

  // Grab any and all files
  var customFiles = expandFiles(customFile).concat(expandFiles(customTemplateDir)),
      stdFiles = expandFiles(stdFile).concat(expandFiles(stdTemplateDir));

  console.log(customFiles, stdFiles);

  // TODO: Use filter to remove custom + standard cross-over

}

// Expose resolveTemplateFiles
module.exports = resolveTemplateFiles;