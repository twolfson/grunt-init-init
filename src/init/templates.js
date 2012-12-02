var stdTemplates = require('./getStandardTemplates'),
    customTemplates = require('./getCustomTemplates'),
    path = require('path'),
    grunt = require('grunt'),
    gruntUtils = grunt.utils,
    _ = gruntUtils._;

function getTemplateName(file) {
  var extname = path.extname(file),
      filename = path.basename(file, extname);
  return filename;
}

// Strip down the name of std and custom templates
var stdNames = stdTemplates.map(getTemplateName),
    customNames = customTemplates.map(getTemplateName);

// Combine the template names
var names = _.union(stdNames, customNames);

// Expose all template properties
module.exports = {
  'getTemplateName': getTemplateName,
  'standard': stdTemplates,
  'custom': customTemplates,
  'standardNames': stdNames,
  'customNames': customNames,
  'names': names
};