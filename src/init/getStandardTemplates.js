// Load up grunt and fetch the task dir path
var grunt = require('grunt'),
    paths = require('./paths'),
    initDir = paths.standard,
    templates = grunt.file.expandFiles(initDir + '/*.js');

// Export the the standard templates
module.exports = templates;