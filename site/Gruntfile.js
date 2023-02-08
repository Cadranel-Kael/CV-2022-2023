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
        autoprefixer: {
            options: {
                browsers: ['last 4 versions', 'ie 8', 'ie 9']
            },
            target: {
                files: {
                    'src/css/styles.css': 'src/css/styles.css'
                }
            },
        },
        watch: {
            files: ['src/js/*.js', 'src/css/scss/*.scss'],
            tasks: ['sass', 'autoprefixer', 'uglify', 'cssmin'],
            options: {
                livereload:true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: {
                        path: './',
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
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('prod', ['sass', 'autoprefixer', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['connect', 'watch']);
};

