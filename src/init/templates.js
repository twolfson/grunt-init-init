module.exports = function (grunt) {
  var stdTemplates = require('./getStandardTemplates')(grunt),
      customTemplates = require('./getCustomTemplates')(grunt),
      resolve = require('./resolveTemplateFiles')(grunt),
      path = require('path'),
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
  return {
    'getTemplateName': getTemplateName,
    'resolve': resolve,
    'standard': stdTemplates,
    'custom': customTemplates,
    'standardNames': stdNames,
    'customNames': customNames,
    'names': names
  };
};