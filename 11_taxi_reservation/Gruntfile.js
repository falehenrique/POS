/*global module: false*/

var source = 'src';
var destination = 'dist';

/**
 * Version from AppTemplate
 */
var version = '1.0.0';

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        data_include: {
            data: {
                cwd: source + '/data/',
                src: ['data.js'],
                dest: source + '/data/include.'
            }
        },
        jst: {
            precompile: {
                src: source + '/app/templates/*.tpl',
                dest: source + '/app/templates/compiled/compiled.js'
            }
        },
        concat: {
            md: {
                src: [
                    'README.md',
                    'CHANGELOG.md'
                ],
                dest: 'tmp/COMPLETE.md'
            },
            css: {
                src: [
                    source + '/css/reset.css',
                    source + '/css/app.css',
                    source + '/css/*.css',
                    source + '/libs/**/*.css'
                ],
                dest: destination + '/css/combined.css'
            },
            js: {
                src: [
                    source + '/libs/zepto/zepto.min.js',
                    source + '/libs/underscore/underscore.js',
                    source + '/libs/backbone/backbone.js',
                    source + '/libs/iscroll/build/iscroll.js',
                    source + '/libs/roller/roller.js',
                    source + '/libs/sign/sign.js',
                    source + '/libs/datepick/datepick.js',
                    source + '/libs/num_keyboard/num_keyboard.js',
                    source + '/libs/slideshow/slideshow.js',
                    source + '/libs/qrcode/qrcode.min.js',
                    source + '/libs/tetra/tetra.js',

                    source + '/app/app.js',
                    source + '/data/include.data.js',
                    source + '/app/core/strings.js',
                    source + '/app/core/mediator.js',
                    source + '/app/core/appParameters.js',
                    source + '/app/core/stringtable.js',
                    source + '/app/core/pos.js',
                    source + '/app/core/*.js',
                    source + '/app/templates/compiled/*.js',
                    source + '/app/views/*.js',
                    source + '/app/models/*.js',
                    source + '/app/collections/*.js',
                    source + '/app/modules/*/view.js',
                    source + '/app/services/*.js',
                    source + '/app/init.js'
                ],
                dest: destination + '/combined.js'
            }
        },
        cssmin: {
            css: {
                src: destination + '/css/combined.css',
                dest: destination + '/css/combined.css'
            }
        },
        uglify: {
            js: {
                src: destination + '/combined.js',
                dest: destination + '/combined.js'
            }
        },
        processhtml: {
            build: {
                src: source + '/index.html',
                dest: destination + '/index.html'
            }
        },
        copy: {
            /* web -------------------------------------------- */
            webimg: {
                cwd: source + '/img', // set working folder / root to copy
                src: '**/*', // copy just all files
                dest: destination + '/img', // destination folder
                expand: true // required when using cwd
            },
            webfonts: {
                cwd: source + '/fonts', // set working folder / root to copy
                src: '*', // copy just all files
                dest: destination + '/fonts', // destination folder
                expand: true // required when using cwd
            },
            webvideos: {
                cwd: source + '/video', // set working folder / root to copy
                src: '**/*', // copy just all files
                dest: destination + '/video', // destination folder
                expand: true // required when using cwd
            },
            consts: {
                src: source + '/consts.js',
                dest: destination + '/consts.js'
            }
        },
        jslint: {
            check: {
                src: [
                    source + '/app/app.js',
                    source + '/data/include.data.js',
                    source + '/app/init.js',
                    source + '/consts.js',

                    source + '/app/core/*.js',

                    source + '/app/views/*.js',

                    source + '/app/models/*.js',

                    source + '/app/collections/*.js',

                    source + '/app/modules/*/view.js',

                    source + '/app/services/*.js'
                ],
                directives: {
                    plusplus: true,
                    browser: true,
                    nomen: true,
                    todo: true,
                    // add predefined libraries
                    predef: [
                        '$',
                        '_',
                        'Backbone'
                    ]
                },
                options: {
                    edition: 'latest',
                    jslintXml: 'test/output/lint/app-jslint.xml',
                    checkstyle: 'test/output/lint/app-checkstyle.xml',
                    errorsOnly: false,
                    failOnError: false
                }
            }
        },
        qunit_junit: {
            options: {
                dest: 'test/output/results'
            }
        },
        qunit: {
            src: ['test/index.html'],
            options: {
                coverage: {
                    src: [source + '/app/**/*.js', '!' + source + '/app/templates/compiled/*.js'],
                    instrumentedFiles: 'tmp/',
                    htmlReport: 'test/output/coverage',
                    coberturaReport: 'test/output/report',
                    linesThresholdPct: 40,
                    statementsThresholdPct: 40,
                    functionsThresholdPct: 40,
                    branchesThresholdPct: 40
                }
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: source + '/img/',
                        dest: source + '/img/',
                        src: ['**/*.{png,jpg}']
                    }
                ]
            }
        },
        compass: {
            dist: {
                options: {
                    config: source + '/config.rb',
                    basePath: source
                }
            }
        },
        clean: {
            build: ["test/output", destination, "tmp"],
            post_build: [destination + "/img/spr", "tmp"],
            doc: ["doc"]
        },

        version: {
            template: {
                options: {
                    prefix: 'version += +[\'"]'
                },
                src: ['Gruntfile.js']
            },
            consts: {
                options: {
                    prefix: 'version: +[\'"]'
                },
                src: [source + '/app/core/appParameters.js']
            },
            bower: {
                options: {
                    prefix: '"version": +[\'"]'
                },
                src: [source + '/bower.json']
            },
            changelog: {
                options: {
                    prefix: '### +HEAD +'
                },
                src: ['CHANGELOG.md']
            },
            js: {
                options: {
                    prefix: '@version\\s*'
                },
                src: [
                    source + '/**/*.js',
                    '!' + source + '/libs/**/*.js'
                ]
            }
        },
        replace: {
            // Remove 'HEAD' and include date in version
            changelog_date: {
                src: ['CHANGELOG.md'],
                overwrite: true,
                replacements: [{
                    from: /HEAD ([0-9a-zA-Z\-_\+\.]+)/g,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        return regexMatches[0] + " (" + grunt.template.today('mmmm d, yyyy') + ")";
                    }
                }]
            },
            template_name: {
                src: [source + '/bower.json', 'test/bower.json', source + '/app/core/appParameters.js'],
                overwrite: true,
                replacements: [{
                    from: /app_template/g,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        return grunt.file.readJSON('package.json').name;
                    }
                }]
            },
            template_desc: {
                src: ['jsdoc.json', 'README.md'],
                overwrite: true,
                replacements: [{
                    from: /App Template/g,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        return grunt.file.readJSON('package.json').title;
                    }
                }]
            }
        },
        search: {
            // check if there is a HEAD 0 directive to be replaced
            head0: {
                files: {
                    src: ['CHANGELOG.md']
                },
                options: {
                    searchString: /### +HEAD +0/g,
                    logFile: "tmp/results.json",
                    onComplete: function (result) {
                        if (result.numMatches > 1) {
                            grunt.fail.fatal("There is an error in the CHANGELOG.md.\n");
                        } else if (result.numMatches === 0) {
                            grunt.fail.fatal("Missing entry 'HEAD 0' on CHANGELOG.md for release.\n");
                        }
                    }
                }
            },
            // Seach for top version in changelog. Must be equal to package.json for release
            version: {
                files: {
                    src: ['CHANGELOG.md']
                },
                options: {
                    searchString: /([0-9a-zA-Z\-_\+\.]+)/,
                    logFile: "tmp/results.json",
                    onComplete: function (result) {
                        if (result.numMatches === 0) {
                            grunt.fail.fatal("There is an error in the CHANGELOG.md.\n");
                        } else {
                            if (grunt.file.readJSON('package.json').version !== result.matches['CHANGELOG.md'][0].match) {
                                grunt.fail.fatal("Changelog version and package version does not match!\n");
                            }
                        }
                    }
                }
            }
        },

        jsdoc: {
            dist: {
                src: [
                    'tmp/COMPLETE.md',
                    source + '/**/*.js',
                    'test/**/*.js',
                    '!test/libs/**/*.js',
                    '!' + source + '/libs/**/*.js',
                    '!' + source + '/app/templates/compiled/*.js'
                ],
                options: {
                    destination: 'doc',
                    ignoreWarnings: false,
                    configure: "jsdoc.json",
                    template: "node_modules/ink-docstrap/template"
                }
            }
        },

        watch: {
            generated: {
                files: [
                    source + '/sass/*.scss',
                    source + '/app/templates/*.tpl',
                    '!' + source + '/app/templates/compiled/*.js'
                ],
                tasks: ['compile'],
                options: {
                    spawn: true,
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.loadNpmTasks('grunt-processhtml');

    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-search');

    grunt.registerTask('default', ['clean:build', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml:build', 'copy:webimg', 'copy:webfonts', 'copy:webvideos', 'copy:consts', 'clean:post_build']);

    grunt.registerTask('build', ['compile', 'default', 'test']);

    grunt.registerTask('release', ['bump', 'build', 'doc']);

    grunt.registerTask('bump', ['search:head0', 'version:consts', 'version:changelog', 'version:js', 'version:bower', 'replace:changelog_date']);

    grunt.registerTask('test', ['jslint:check', 'qunit_junit', 'qunit']);

    grunt.registerTask('compile', ['imagemin:build', 'compass', 'jst:precompile']);

    grunt.registerTask('doc', ['clean:doc', 'concat:md', 'jsdoc', 'clean:post_build']);

    grunt.registerTask('watcher', ['watch:generated']);
};