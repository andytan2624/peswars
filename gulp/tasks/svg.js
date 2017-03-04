'use strict';

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');
var config      = require('../config');
var replace     = require('gulp-replace');

gulp.task('svg', function() {
    return gulp.src(config.svg.src)
        .pipe(replace('id="DESK','class="DESK'))
        .pipe(replace('id="ROOM','class="ROOM'))
        .pipe(replace("font-family:'MyriadPro-Regular';",''))
        .pipe(gulpif(global.isProd, imagemin()))
        .pipe(gulp.dest(config.svg.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
