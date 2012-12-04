function noop() {}

// Change the working directory
process.chdir(__dirname + '/../../init-dev');

var grunt = require('grunt'),
    path = require('path'),
    init = {
      'renames': {},
      // https://github.com/gruntjs/grunt/blob/master/tasks/init.js#L91-L107
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
      // https://github.com/gruntjs/grunt/blob/master/tasks/init.js#L108-L175
      'srcpath': function(arg1) {
        if (arg1 == null) { return null; }
        var args = ['init', name, 'root'].concat(grunt.utils.toArray(arguments));
        return grunt.task.getFile.apply(grunt.file, args);
      },
      'destpath': path.join.bind(path, process.cwd()),
      'copy': function(srcpath, destpath, options) {
        // Destpath is optional.
        if (typeof destpath !== 'string') {
          options = destpath;
          destpath = srcpath;
        }
        // Ensure srcpath is absolute.
        if (!grunt.file.isPathAbsolute(srcpath)) {
          srcpath = init.srcpath(srcpath);
        }
        // Use placeholder file if no src exists.
        if (!srcpath) {
          srcpath = grunt.task.getFile('init/misc/placeholder');
        }
        grunt.verbose.or.write('Writing ' + destpath + '...');
        try {
          grunt.file.copy(srcpath, init.destpath(destpath), options);
          grunt.verbose.or.ok();
        } catch(e) {
          grunt.verbose.or.error().error(e);
          throw e;
        }
      },
      // https://github.com/gruntjs/grunt/blob/master/tasks/init.js#L91-L107
      'copyAndProcess': function(files, props, options) {
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

// https://github.com/gruntjs/grunt/blob/master/tasks/init.js#L83
var pathPrefix = '../src/init/root/';

// Add in our searchDir
// https://github.com/gruntjs/grunt/blob/master/lib/grunt/task.js#L209-L255
grunt.task.searchDirs.push(__dirname);

// Load the default grunt tasks
grunt.task.loadTasks(__dirname + '/../node_modules/grunt/tasks');

initTemplate.template(grunt, init,  function() {
  // Fail task if errors were logged.
  if (grunt.task.current.errorCount) { console.error('An error occurred'); }

  // Otherwise, print a success message.
  grunt.log.writeln().writeln('Initialized from template "???".');
});