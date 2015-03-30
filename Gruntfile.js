//npm install grunt-contrib-concat --save-dev
//npm install grunt-contrib-uglify --save-dev
//npm install grunt-contrib-jshint --save-dev
//npm install grunt-contrib-cssmin --save-dev
//npm install grunt-contrib-watch --save-dev

module.exports = function( grunt ){
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.initConfig({
		watch: { //this task could be used for watching js files live!
			scripts: {
				files: ['src/app/**/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false,
				},
			},
		},
		jshint: {
			src: ['src/app/**/*.js', 'test/**/*.js'],
			options: {
				curly:  true,
				immed:  true,
				newcap: true,
				noarg:  true,
				sub:    true,
				boss:   true,
				eqnull: true,
				node:   true,
				undef:  true,
				globals:{
					document:   false,
					it:         false,
					Blob:       false,
					saveAs:     false,
					describe:   false,
					beforeEach: false,
					inject:     false,
					xit:        false,
					expect:     false,
					spyOn:      false,
					_:          false,
					jQuery:     false,
					angular:    false,
					moment:     false,
					alert:      false,
					jasmine: 		false,
					console:    false,
					$:          false,
					io:         false
				}
			}
		},
		concat: {
			dist: {
				src:['src/app/**/*.js'],
				dest: 'dist/js/app.js'
			}
		},
		uglify: {
			dist: {
				src:['dist/js/app.js'],
				dest: 'dist/js/app.min.js'
			}
		},
    cssmin: {
			target: {
				files: [{
				expand: true,
				cwd: 'src/css',
				src: ['*.css', '!*.min.css'],
				dest: 'build/css',
				ext: '.min.css'
				}]
			}
	  }
	});
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
};
