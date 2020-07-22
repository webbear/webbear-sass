var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var vars = {
  sassIn: "./src/scss/**/*.scss",
  cssOut: "./src/css/",
  cssMinOut: "./dist/css/",
  jsIn: "./src/js/**/*.js",
  jsOut: "./src/js/",
  jsMinOut: "./dist/js/"
};

gulp.task('sass', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
    .src(vars.sassIn)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer(vars.autoprefixerOptions))
    .pipe(gulp.dest(vars.cssOut));
});

gulp.task('sass:dist', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
    .src(vars.sassIn)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(vars.autoprefixerOptions))
    .pipe(gulp.dest(vars.cssMinOut));
});

gulp.task('scripts:dist', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
    .src(vars.jsIn)
    .pipe(uglify())
    .pipe(gulp.dest(vars.jsMinOut));
});