module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    },
    'install-init': {
      '{%= template_name %}': 'src'
    }
  });

  // Load grunt-install-init
  grunt.loadNpmTasks('grunt-install-init');

  // By default, install the init
  grunt.registerTask('default', 'install-init');

  // Development task
  grunt.registerTask('dev', 'lint test');

};
