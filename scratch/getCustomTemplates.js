// TODO: This should include not just folders but ALSO apply custom overrides

// Load up grunt and fetch the task dir path
var fs = require('fs'),
    path = require('path'),
    grunt = require('grunt'),
    taskDir = grunt.file.userDir('tasks/init'),
    taskFilePattern = taskDir + '/*';

// TODO: Don't forget to be graceful if taskDir doesn't exist (graceful-fs maybe)

// // Find the files/dirs that exist in the directory
var files = fs.readdirSync(taskDir);
// var files = grunt.file.expandFiles(taskFilePattern),
//     dirs = grunt.file.expandDirs(taskFilePattern);

// // Normalize the files to be extension-less
// files = files.map(function (file) {

// });


console.log(files);