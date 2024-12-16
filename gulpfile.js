const postcss = require("gulp-postcss");
const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const gulpIf = require("gulp-if");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const del = require("del");
const fs = require('fs');


gulp.task("html", function () {
    return gulp.src("./html/*.html")
        .pipe(replace(".html", ""))
        .pipe(replace('"../', '"'))
        .pipe(useref())
        .pipe(gulp.dest("./build"))
});

gulp.task("css", function () {
    const plugins = [
        autoprefixer({ browsers: ["last 1 version"] }),
        cssnano()
    ];
    return gulp.src("./css/*.css")
        .pipe(concat("styles.css"))
        .pipe(postcss(plugins))
        .pipe(gulp.dest("./build/css"));
});

gulp.task("js", function () {
    return gulp.src("./js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"))
})

gulp.task("fonts", function () {
    return gulp.src("fonts/*")
        .pipe(gulp.dest("./build/fonts"))
});

gulp.task("images", function () {
    return gulp.src("images/**/*.+(png|jpg|gif|svg)")
        .pipe(imagemin())
        .pipe(gulp.dest("./build/images"))
});

gulp.task("favicon", function (done) {
    fs.createReadStream("images/favicon.ico").pipe(fs.createWriteStream("build/favicon.ico"))
    return done();
})

gulp.task("clean", function (done) {
    del.sync("build");
    return done();
})

gulp.task("dist", gulp.series("clean", "html", "css", "js", "fonts", "images"));