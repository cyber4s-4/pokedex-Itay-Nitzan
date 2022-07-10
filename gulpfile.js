const gulp = require("gulp");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const { exec } = require("child_process");

const webpackConfig = require("./webpack.config.js");

// Removes previous dist
gulp.task("clean", () => {
  return gulp.src("./dist", { allowEmpty: true }).pipe(clean());
});

// Creates js bundle from several js files
gulp.task("webpack", () => {
  return webpack(webpackConfig).pipe(gulp.dest("./dist"));
});

// Converts scss to css
gulp.task("scss", () => {
  return gulp.src("./src/**/*.scss").pipe(sass()).pipe(gulp.dest("./dist"));
});

// Transfers index
gulp.task("index", () => {
  return gulp.src(["./src/**/*.html"]).pipe(gulp.dest("./dist"));
});

// Transfers index
gulp.task("icon", () => {
  return gulp.src(["./src/favicon.ico"]).pipe(gulp.dest("./dist"));
});

// Watch scss files
gulp.task("watch-scss", () => {
  return gulp.watch("./src/**/*.scss", gulp.series("scss"));
});

// Watch html files
gulp.task("watch-html", () => {
  return gulp.watch(["./src/**/*.html"], gulp.series("index"));
});

// Watch tsc files
gulp.task("watch-tsc", () => {
  return gulp.watch("./dist/js/**/*.js", gulp.series("webpack"));
});

// Initial ts compile
gulp.task("tsc", (cb) => {
  exec("tsc", () => cb());
});

// Watch ts files and recompile
gulp.task("tsc-w", () => {
  const tsc = exec("tsc -w --preserveWatchOutput --pretty");

  tsc.stdout.on("data", (data) => console.log(data));
  tsc.stderr.on("data", (data) => console.error(data));

  tsc.on("close", (code) => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task("express", () => {
  const tsc = exec("nodemon server.js");
  tsc.stdout.on("data", (data) => console.log(data));
  tsc.stderr.on("data", (data) => console.error(data));
});

// Run all together
gulp.task(
  "default",
  gulp.series(
    "clean",
    "scss",
    "index",
    "icon",
    "tsc",
    "webpack",
    gulp.parallel("watch-scss", "watch-html", "watch-tsc", "tsc-w", "express")
  )
);

// Run all together
gulp.task(
  "build",
  gulp.series("clean", "scss", "index", "icon", "tsc", "webpack")
);
