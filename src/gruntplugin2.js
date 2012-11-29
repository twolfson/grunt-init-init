/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

// Basic template description.
exports.description = 'Standard init:gruntplugin with better test functionality.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'The grunt plugin system is still under development. For ' +
  'more information, see the docs at https://github.com/gruntjs/grunt/blob/master/docs/plugins.md';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  // Add on a keywords prompt
  grunt.helper('prompt_for_obj').keywords = {
    message: 'What keywords relate to this plugin (comma separated)?',
    'default': 'gruntplugin'
  };

  grunt.helper('prompt', {type: 'grunt'}, [
    // Prompt for these values.
    grunt.helper('prompt_for', 'name', function(value, data, done) {
      // Prepend "grunt-" to default name if not already there.
      data.short_name = value;
      value = data.full_name = 'grunt-' + value;
      // if (!/^grunt-/.test(value)) { value = 'grunt-' + value; }
      done(null, value);
    }),
    grunt.helper('prompt_for', 'description', 'The best sample grunt tasks ever.'),
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

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
