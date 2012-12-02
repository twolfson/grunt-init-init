// Load up grunt and fetch the task dir path
var path = require('path'),
    grunt = require('grunt'),
    gruntDir = require.resolve('grunt'),
    initDir = path.join(gruntDir, '../../tasks/init'),
    templates = grunt.file.expandFiles(initDir + '/*.js');

// Export the the standard templates
module.exports = templates;