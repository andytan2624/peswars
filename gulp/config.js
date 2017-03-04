'use strict';

module.exports = {

  'serverport': 3000,

  'scripts': {
    'src': './app/js/**/*.js',
    'dest': './build/js/'
  },

  'images': {
    'src': './app/images/**/*.{jpeg,jpg,png}',
    'dest': './build/images/'
  },

  'svg': {
    'src': './app/images/**/*.svg',
    'dest': './build/images/'
  },

  'styles': {
    'compileFile': './app/styles/**/main.scss',
    'src': './app/styles/**/*.scss',
    'dest': './build/css/'
  },

  'sourceDir': './app/',

  'buildDir': './build/'

};