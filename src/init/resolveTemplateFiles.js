// Load in grunt
var grunt = require('grunt'),
    path = require('path'),
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

  // Generate a hash of files to prevent repeats
  var fileMap = {};
  customFiles.forEach(function (file) {
    // Extract the relative path of the file
    var relPath = path.relative(customDir, file);

    // Save the relative path
    fileMap[relPath] = true;
  });

  // Override each of the stdFiles
  stdFiles = stdFiles.filter(function (file) {
    // Extract the relative path of the file
    var relPath = path.relative(stdDir, file),
        overrideExists = fileMap[relPath];

    // Return if no override exists
    return !overrideExists;
  });

  // Join together the files
  var files = customFiles.concat(stdFiles);

  // Return the files
  return files;
}

// Expose resolveTemplateFiles
module.exports = resolveTemplateFiles;