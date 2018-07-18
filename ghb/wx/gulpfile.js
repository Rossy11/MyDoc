var gulp = require('gulp');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var mask = require('gulp-mask');
var eslint = require('gulp-eslint');

gulp.task('watch', function () {
    gulp.watch('tags/*.tag', ['main', 'lint']);
});

gulp.task('default', ['main']);

gulp.task('main', function () {
    gulp.src('tags/*.tag')
        .pipe(riot({template: 'jade'}))
        .pipe(concat('wx.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
    return gulp.src('tags/*.tag')
        .pipe(mask('script(type="text/es6").', 'style(scoped).'))
        .pipe(eslint())
        .pipe(eslint.format())
});
