/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

// Basic template description.
exports.description = 'Create a grunt template from any grunt template.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'The grunt plugin system is still under development. For ' +
  'more information, see the docs at https://github.com/gruntjs/grunt/blob/master/docs/plugins.md';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  var _ = grunt.utils._;

  // Add on a keywords prompt
  grunt.helper('prompt_for_obj').keywords = {
    message: 'What keywords relate to this plugin (comma separated)?',
    'default': 'gruntplugin'
  };

  // Load in the templates helper
  var templates = require('./init/templates')(grunt),
      templateNames = templates.names,
      templateStr = templateNames.join(', ');

  grunt.helper('prompt_for_obj').template = {
    message: 'What template is this based on?',
    // TODO: REVERT TEMPLATE STR
    // 'default': templateStr,
    'default': 'jquery',
    warning: 'You must select a template from the list of templates',
    validator: function (template) {
      // Assert that the template is in our list
      var templateIsInList = templateNames.indexOf(template) > -1;
      return templateIsInList;
    }
  };

  // Add on a template_name prompt
  grunt.helper('prompt_for_obj').template_name = {
    message: 'What is the name of this template?'
  };

  grunt.helper('prompt', {type: 'init'}, [
    // Prompt for these values.
    grunt.helper('prompt_for', 'name', function (value, data, done) {
      // Prepend "grunt-" to default name if not already there.
      data.short_name = value;
      value = data.full_name = 'grunt-' + value;
      // if (!/^grunt-/.test(value)) { value = 'grunt-' + value; }
      done(null, value);
    }),
    grunt.helper('prompt_for', 'template_name', function (value, data, done) {
      // Trim down grunt-init-wasd to wasd
      var full_name = data.full_name,
          template_name = full_name.replace(/grunt\-?/i, '').replace(/init\-?/i, '');
      done(null, template_name);
    }),
    grunt.helper('prompt_for', 'template'),
    grunt.helper('prompt_for', 'description', 'The best grunt init template ever.'),
    grunt.helper('prompt_for', 'version'),
    grunt.helper('prompt_for', 'repository'),
    grunt.helper('prompt_for', 'homepage'),
    grunt.helper('prompt_for', 'bugs'),
    grunt.helper('prompt_for', 'licenses'),
    grunt.helper('prompt_for', 'author_name'),
    grunt.helper('prompt_for', 'author_email'),
    grunt.helper('prompt_for', 'author_url'),
    grunt.helper('prompt_for', 'grunt_version'),
    grunt.helper('prompt_for', 'node_version', '*'),
    grunt.helper('prompt_for', 'keywords')
  ], function(err, props) {
    // Set a few grunt-plugin-specific properties.
    props.main = 'grunt.js';
    props.npm_test = 'grunt --base ./test/ --config ./test/grunt.js';
    props.bin = 'bin/' + props.name;

    // Break up the keywords by commas
    var keywords = props.keywords;
    keywords = keywords.split(',');

    // Trim each keyword and save
    keywords = keywords.map(function (str) {
      return str.trim();
    });
    props.keywords = keywords;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Specify dependencies of grunt and grunt-install-init
    props.dependencies = {
      'grunt': '~' + grunt.version,
      'grunt-install-init': '~1.0.2'
    };

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // Look up template files (custom then standard)
    var tplName = props.template,
        tplFiles = templates.resolve(tplName);

    // Copy template files -- _.each is backwards =(
    // _.each(tplFiles, function (val, key) {
    _.each(tplFiles, function (srcFile, destFile) {
      // Add 'src/' onto destFile
      destFile = 'src/' + destFile;

      // Copy over the file
      grunt.file.copy(srcFile, destFile);
    });

    // TODO: and preferrably same keywords as copied directory (as defaults)
    // TODO: Renaming item to its proper source would be a nice touch (i.e. jquery -> {{new_name}})
    // TODO: Nice touch would be grabbing the default description from the normal template
    // TODO: Nice touch would be replacing out the default description inside of the templatejs itself @_@

    // All done!
    done();
  });

};
