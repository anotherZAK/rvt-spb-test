'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const svgclear = require("gulp-cheerio");
const del = require('del');
const svgSprite = require('gulp-svg-sprite');

gulp.task('css', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('style.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('css-min', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css-min'));
  gulp.watch('source/img/icon-*.svg', gulp.series('svg-sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('imagemin', () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo(),
    ]))

    .pipe(gulp.dest('source/img'));

});

gulp.task('webp', () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('source/img'));
});

const configSprite = {
  shape: {
    dimension: {
      maxWidth: 500,
      maxHeight: 500,
    },
    spacing: {
      padding: 0,
    },
  },
  mode: {
    symbol: {
      dest: '.',
    },
  },
};

gulp.task('svg-sprite', (cb) => {
  return gulp.src('source/img/svg-2-sprite/*.svg')
    .pipe(svgSprite(configSprite))
    .pipe(svgclear({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
      },
      parserOptions: {
        xmlMode: true,
      },
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include(),
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', () => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/png/*',
    'source/img/jpg//**/*',
    'source/img/svg/*',
    // 'source/js/main.js',
    'source//*.ico',
  ], {
    base: 'source',
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'css-min', 'css', 'svg-sprite', 'html'));
gulp.task('start', gulp.series('build', 'server'));
