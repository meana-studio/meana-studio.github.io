"use strict";
const gulp = require("gulp");
const { src, dest, parallel } = require('gulp');
const browserSync = require("browser-sync").create();
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require("css-mqpacker");
const plumber = require("gulp-plumber");
const pug = require('gulp-pug');
const beautify = require("gulp-html-beautify");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify-es").default;
const notify = require('gulp-notify');
const newer = require('gulp-newer');

const filepath = {
  html: './docs/',
  css: './docs/assets/css',
}

const path = {
  pug: ['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'],
  scss: './src/scss/**/*.scss',
  js: './src/js/**/*.js'
}

// browser sync
function browserSyncFunc(done) {
  browserSync.init({
    server: {
      baseDir: 'docs/',  // docsフォルダをルートディレクトリとして提供
    },
    port: 3000,  // Expressの代わりにBrowserSyncが使用するポート
    reloadOnRestart: true
  });
  done();
}

/* Sass */
function css() {
  const plugin = [
    autoprefixer(),
    mqpacker(),
    cssDeclarationSorter({
      order: 'smacss'
    })
  ];
  return src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss(plugin))
    .pipe(sourcemaps.write("../maps/"))
    .pipe(dest(filepath.css))
    .pipe(browserSync.stream());  // CSS変更時にブラウザを自動リロード
}

/* pug */
function html() {
  return src(['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug())
    .pipe(beautify({
      'indent_size': 2,
      'indent_level': 0,
      'indent_with_tabs': false,
      'indent_inner_html': false,
      "indent_scripts": "keep",
      'content_unformatted': 'script',
      'indent_char': ' '
    }))
    .pipe(dest(filepath.html))
    .pipe(browserSync.stream());  // HTML変更時にブラウザを自動リロード
}

/* js */
function js() {
  return src('./src/js/**/*.js', {
    sourcemaps: true
  })
  .pipe(plumber())
  .pipe(babel())
  .pipe(uglify())
  .pipe(concat('bundle.js'))
  .pipe(dest('./docs/assets/js'))
  .pipe(browserSync.stream());  // JS変更時にブラウザを自動リロード
}

// watch
function watch(done) {
  gulp.watch('./src/pug/**/*.pug', html);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./src/scss/**/*.scss', css);
  done();
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.server = browserSyncFunc;
exports.watch = watch;
exports.default = parallel(watch, css, html, js, browserSyncFunc);
