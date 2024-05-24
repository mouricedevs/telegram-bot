var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var markdown = require('gulp-markdown');

gulp.task('default', function() {
  gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

  gulp.src('./*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./build/markdown'));
});

gulp.task('watch', function() {
    gulp.watch('./*.js', ['default']);
    gulp.watch('./*.md', ['default']);
});
