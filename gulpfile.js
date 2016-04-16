var gulp = require('gulp');
var polybuild = require('polybuild');

gulp.task('build', function () {
    return gulp.src('app/index.html')
        .pipe(polybuild({
            maximumCrush: true,
            suffix: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['build']);