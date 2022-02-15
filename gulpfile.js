var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('autoprefixer');
var terser = require('terser');
var concat = require('gulp-concat');
var Fiber = require('fibers');
var del = require('del');
var postcss = require('gulp-postcss');
var vars = {
  sassIn: "./src/scss/**/*.scss",
  cssOut: "./src/css/",
  cssMinOut: "./dist/css/",
  jsIn: "./src/js/**/*.js",
  jsOut: "./src/js/",
  jsMinOut: "./dist/js/"
};
var postcssPlugins = [
  autoprefixer()
];

gulp.task('sass', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
    .src(vars.sassIn)
    .pipe(sass({
      fiber: Fiber,
      outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(vars.cssOut));
});

gulp.task('sass:dist', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
    .src(vars.sassIn)
    .pipe(sass({
      fiber: Fiber,
      outputStyle: 'compressed'
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(vars.cssMinOut));
});

gulp.task('scripts:dist', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
    .src(vars.jsIn)
    .pipe(terser())
    .pipe(gulp.dest(vars.jsMinOut));
});