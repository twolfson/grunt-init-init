// Load up grunt and fetch the task dir path
var fs = require('fs'),
    path = require('path'),
    grunt = require('grunt'),
    taskDir = grunt.file.userDir('tasks/init'),
    taskFilePattern = taskDir + '/*';

// TODO: Don't forget to be graceful if taskDir doesn't exist (graceful-fs maybe)

// Find the files/dirs that exist in the directory
var files = grunt.file.expandFiles(taskDir + '/*.js');
    // dirs = grunt.file.expandDirs(taskFilePattern);

// // Normalize the files to be extension-less
// files = files.map(function (file) {
//   var extname = path.extname(file),
//       filename = path.basename(file, extname);
//   return filename;
// });

// // Normalize the dirs to basenames as well (overkill silliness with grunt)
// dirs = dirs.map(function (dir) {
//   // Grab the dirname and remove its trailing slash
//   var dirname = path.basename(dir, '/');
//   return dirname;
// });

// Export the files
module.exports = files;