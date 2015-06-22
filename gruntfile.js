module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    jshint: {
      src: ['data-utils.js']
    },
    browserify: {
      dist: {
	files: {
	  'dist/data-utils.js': ['data-utils.js']
	}
      }
    },
    uglify: {
      options: {
	mangle: false
	},
      build: {
	files: {
	  'dist/data-utils.min.js' : ['dist/data-utils.js']
	}
      }
    }
  });
  grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);

}
