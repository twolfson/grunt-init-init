// Load in required modules
module.exports = function (grunt) {
var path = require('path');

// Grab the keys of require.cache
var requireCache = require.cache,
    cacheKeys = Object.getOwnPropertyNames(requireCache);

// Find the first key that ends with grunt.js
var i = 0,
    len = cacheKeys.length,
    cacheKey,
    gruntPath = '';
for (; i < len; i++) {
  cacheKey = cacheKeys[i];

  // If the cacheKey ends with 'grunt.js', save it and stop searching
  if (cacheKey.slice(-8) === 'grunt.js') {
    gruntPath = cacheKey;
    break;
  }
}

// If there is no gruntPath, throw an error
if (!gruntPath) {
  throw new Error('Path to grunt could not be found! =(');
}

// Standard path
// var gruntPath = require.resolve('grunt'),
var stdDir = path.join(gruntPath, '../../tasks/init');

// Custom path (this will be null if it does not exist)
var customDir = grunt.file.userDir('tasks/init');

// Expose the dirs
return {
  'grunt': gruntPath,
  'standard': stdDir,
  'custom': customDir
};
};