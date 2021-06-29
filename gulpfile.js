"use strict";
const gulp = require("gulp");
const { src, dest, parallel } = require('gulp');
const browserSync = require("browser-sync");
const sass = require("gulp-dart-sass");
const postcss = require('gulp-postcss');
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require("css-mqpacker");
const plumber = require("gulp-plumber");
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify-es").default;
const notify = require('gulp-notify');
const changed  = require('gulp-changed');
const filepath = {
	html: './dist/',
	css: './dist/assets/css',
}
const path = {
	pug: "['./src/pug/**/*.pug', '!./src/pug/**/_*.pug']",
	scss: './src/scss/**/*scss',
	js: './src/js/**/*js'
}

// browser sync
function browserSyncFunc(done){
	browserSync.init({
		server: {
			baseDir: 'dist/',
			directory: false
		},
		port: 3000,
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
			outputStyle: 'compressed',
		}))
    .pipe(postcss(plugin))
		.pipe(sourcemaps.write("../maps/"))
		.pipe(dest(filepath.css))
}

/* pug */
function html() {
	return src(['./src/pug/**/*.pug', '!./src/pug/**/_*.pug'])
		.pipe(changed('./'))
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(pug({pretty:'\t',}))
		.pipe(dest(filepath.html));
}

/* js */
function js() {
    return src('./src/js/**/*.js',{
		sourcemaps: true
	})
	.pipe(plumber())
	.pipe(babel())
	.pipe(uglify())
	.pipe(dest('./dist/assets/js'));
}

// watch
function watch(done) {
	gulp.watch('./src/pug/**/*.pug', gulp.task('html'));
	gulp.watch('./src/js/**/*.js', gulp.task('js'));
	gulp.watch('./src/scss/**/*.scss', gulp.task('css'));
	done();
}


exports.html = html;
exports.css = css;
exports.js = js;
exports.server = browserSyncFunc;
exports.watch = watch;
exports.default = parallel(watch,css,html,js,browserSyncFunc);

