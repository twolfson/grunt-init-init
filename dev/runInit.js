function noop() {}
var pathPrefix = __dirname + '/../src/init/';

var grunt = require('grunt'),
    init = {
      'renames': {},
      'filesToCopy': function(props) {
        var files = {};
        // Iterate over all source files.
        grunt.task.expandFiles({dot: true}, pathPrefix + '**').forEach(function(obj) {
          // Get the path relative to the template root.
          var relpath = obj.rel.slice(pathPrefix.length);
          var rule = init.renames[relpath];
          // Omit files that have an empty / false rule value.
          if (!rule && relpath in init.renames) { return; }
          // Create a property for this file.
          files[rule ? grunt.template.process(rule, props, 'init') : relpath] = obj.rel;
        });
        return files;
      },
      'addLicenseFiles': noop,
      'copyAndProcess': function(files, props, options) {
        console.log(files);
        options = grunt.utils._.defaults(options || {}, {
          process: function(contents) {
            return grunt.template.process(contents, props, 'init');
          }
        });
        Object.keys(files).forEach(function(destpath) {
          var o = Object.create(options);
          var srcpath = files[destpath];
          // If srcpath is relative, match it against options.noProcess if
          // necessary, then make srcpath absolute.
          var relpath;
          if (srcpath && !grunt.file.isPathAbsolute(srcpath)) {
            if (o.noProcess) {
              relpath = srcpath.slice(pathPrefix.length);
              o.noProcess = grunt.file.isMatch(o.noProcess, relpath);
            }
            srcpath = grunt.task.getFile(srcpath);
          }
          // Copy!
          init.copy(srcpath, destpath, o);
        });
      },
      'writePackageJSON': noop
    },
    initTemplate = require('../src/init.js');

// Hackish override for grunt.task.expandFiles
grunt.task.expandFiles = grunt.file.expandFiles;
// console.log(   pathPrefix, grunt.task.expandFiles({dot: true}, pathPrefix + '**'))

// Load the default grunt tasks
grunt.task.loadTasks(__dirname + '/../node_modules/grunt/tasks');

// Change the working directory
process.chdir(__dirname + '/../../init-dev');

initTemplate.template(grunt, init,  function() {
  // Fail task if errors were logged.
  if (grunt.task.current.errorCount) { console.error('An error occurred'); }

  // Otherwise, print a success message.
  grunt.log.writeln().writeln('Initialized from template "???".');
});