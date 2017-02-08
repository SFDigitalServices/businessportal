// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var lr = require('tiny-lr');
var livereload = require('gulp-livereload');
var server = lr();


// Lint Task
gulp.task('lint', function() {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass',function(){
    return gulp.src('/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(''));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('*.js')
    //    .pipe(concat('all.js'))
    //    .pipe(gulp.dest('wp-content/themes/pedalexpress/js'))
    //    .pipe(rename('all.min.js'))
    //    .pipe(uglify())
    //    .pipe(gulp.dest('wp-content/themes/pedalexpress/js'))
        .pipe(livereload(server));
});

//reload php & html
gulp.task('php', function(){
    return gulp.src(['*.html','*.php'])
        .pipe(livereload(server));
});

//reload css
gulp.task('css', function(){
    return gulp.src('*.css')
        .pipe(livereload(server));
});

// Watch Files For Changes
//gulp.task('watch', function() {
//    server.listen(35729, function(err){
//        if(err) return console.log(err);
//    });

//    gulp.watch('*.js', ['lint', 'scripts']);
//    gulp.watch('*.scss', ['sass']);
//    gulp.watch('/**/*.php',['php']);
//    gulp.watch('/**/*.html',['php']);
//    gulp.watch('/**/*.css',['css']);

//});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'php','css']);