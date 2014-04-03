'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);


  grunt.initConfig({

      //MINIFICATION TASKS
      // The following *-min tasks produce minified files in the dist folder
      // imagemin: {
      //   dist: {
      //     files: [
      //       {
      //         expand: true,
      //         cwd: 'public/images',
      //         src: '{,*/}*.{png,jpg,jpeg,gif}',
      //         dest: 'public/images'
      //       }
      //     ]
      //   }
      // },
      'svg-sprites': {
        options: {
          spriteElementPath: 'public/svg/sprites',
          spritePath: 'public/images',
          cssPath: 'public/css'
        },
        shapes: {
          options: {
            sizes: {
              large: 75,
              medium: 30,
              small: 15
            },
            refSize: 26,
            unit: 13
          }
        }
      },

    }
  );

  grunt.registerTask('default', [
    // 'imagemin',
    'svg-sprites'
  ]);
};
