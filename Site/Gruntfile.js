module.exports = function (grunt) {
    const sass = require('node-sass');
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                implementation: sass,
            },
            dist: {
                files: {
                    'src/css/styles.css': 'src/css/scss/styles.scss'
                }
            }
        },
        uglify: {
            jsUglifyAll: {
                files: [
                    {
                        'dist/js/main.min.js': ['src/js/*.js']
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/css/styles.min.css': ['src/css/*.css']
                }
            }
        },
        htmlmin: {
            options: {
                collapseWhiteSpace: true
            },
            target: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        // postcss: {
        //     options: {
        //         processors: [
        //             require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        //         ]
        //     },
        //     dist: {
        //         src: 'dist/css/styles.min.css'
        //     }
        // },
        watch: {
            files: ['src/js/*.js', 'src/css/scss/*.scss', 'src/index.html'],
            tasks: ['sass', 'uglify', 'cssmin', 'htmlmin'],
            options: {
                livereload:true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: {
                        path: 'dist/',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['connect', 'watch']);
};

