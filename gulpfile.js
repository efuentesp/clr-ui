const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
// const purgeCSS = require("gulp-purgecss");
// const concat = require("gulp-concat");
// const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
// const imagemin = require("gulp-imagemin");
// const changed = require("gulp-changed");
// const rename = require("gulp-rename");
// const replace = require("gulp-replace");
const sourcemaps = require("gulp-sourcemaps");
const lec = require("gulp-line-ending-corrector");
// const wrapper = require("gulp-wrapper");
// const prettify = require("gulp-prettify");
const del = require("del");
// const browserify = require("browserify");
// const babelify = require("babelify");
const vinylPaths = require("vinyl-paths");
// const source = require("vinyl-source-stream");
// const buffer = require("vinyl-buffer");
// const browserSync = require("browser-sync").create();

function clean() {
  return gulp
    .src("./dist", { read: false, allowEmpty: true })
    .pipe(vinylPaths(del));
}

function sassIt() {
  return gulp
    .src(["./src/*.scss"])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      sass({
        sourceComments: false
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"]
      })
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("../maps"))
    .pipe(lec())
    .pipe(gulp.dest("./dist/assets/css"));
}

function watch() {
  gulp.watch(["./src/*.scss"], sassIt);
}

exports.clean = clean;
exports.sassIt = sassIt;
exports.watch = watch;

exports.default = gulp.series(clean, gulp.parallel(sassIt));
