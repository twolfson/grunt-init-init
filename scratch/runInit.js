function noop() {}

var grunt = require('grunt'),
    init = {
      'filesToCopy': noop,
      'addLicenseFiles': noop,
      'copyAndProcess': noop,
      'writePackageJSON': noop
    },
    initTemplate = require('../src/init.js');

initTemplate.template(grunt, init,  function() {
  // Fail task if errors were logged.
  if (grunt.task.current.errorCount) { console.error('An error occurred'); }

  // Otherwise, print a success message.
  grunt.log.writeln().writeln('Initialized from template "' + name + '".');
});