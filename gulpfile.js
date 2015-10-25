'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minify = require('gulp-uglify');

gulp.task('sass', function(){
    gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
});

gulp.task('watchSass', function(){
    gulp.watch('src/scss/*.scss', ['sass']);
});
