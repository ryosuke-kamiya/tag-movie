'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  gulp.src('./src/**/*.scss')//ここら辺違うかもしれん
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.scss', gulp.task('sass'));//ここら辺違うかもしれん
})

gulp.task('default',gulp.series('watch'));
