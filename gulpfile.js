const gulp = require("gulp");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
// const browserSync = require("browser-sync").create();
const { exec, execSync, execFile } = require("child_process");
const webpackConfig = require("./webpack.config.js");
const { task } = require("gulp");

// Removes previous dist
gulp.task("clean", () => {
  return gulp
    .src("./dist", {
      allowEmpty: true,
    })
    .pipe(clean());
});

// copies all files exept ts and scss
gulp.task("copy-no-transpile", () => {
  return gulp
    .src(["src/**/*", "!src/**/*.ts", "!src/**/*.scss"])
    .pipe(gulp.dest("./dist/"));
});

// Converts scss to css
gulp.task("transpile-scss", () => {
  return gulp
    .src("./src/client/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/client/"));
});

// Converts ts to js
gulp.task("transpile-ts", (cb) => {
  exec("tsc", (err, msg) => {
    cb();
  });
});

// Creates js bundle from client js files
gulp.task("bundle-client-js", () => {
  return webpack(webpackConfig).pipe(gulp.dest("./dist/client"));
});

// Transfers static files
gulp.task("copy-server-js", () => {
  return gulp.src(["dist/tsc/server/**/*.js"]).pipe(gulp.dest("./dist/server"));
});

// Creates/Updates the dist folder
gulp.task(
  "build",
  gulp.series(
    "clean",
    "copy-no-transpile",
    "transpile-scss",
    "transpile-ts",
    "bundle-client-js",
    "copy-server-js"
  )
);

// Watch static files
gulp.task("watch-static", () => {
  return gulp.watch(
    ["src/**/*", "!src/**/*.ts", "!src/**/*.scss"],
    gulp.series("copy-no-transpile")
  );
});

// Watch scss files
gulp.task("watch-scss", () => {
  return gulp.watch("./src/client/**/*.scss", gulp.series("transpile-scss"));
});

// Watch ts files and recompile
gulp.task("watch-ts", () => {
  exec("tsc -w");
});

// Watch tsc client files
gulp.task("watch-client-js", () => {
  return gulp.watch(
    "./dist/tsc/client/**/*.js",
    gulp.series("bundle-client-js")
  );
});

// Watch tsc setver files
gulp.task("watch-server-js", () => {
  return gulp.watch("./dist/tsc/server/**/*.js", gulp.series("copy-server-js"));
});

// Watch all files
gulp.task(
  "watch",
  gulp.parallel(
    "watch-static",
    "watch-scss",
    "watch-ts",
    "watch-client-js",
    "watch-server-js"
  )
);

// start nodemon
gulp.task("nodemon", () => {
  exec("nodemon dist/server/server.js");
  exec("google-chrome http://localhost:3000");
});

// Run all together
gulp.task("default", gulp.series("build", gulp.parallel("watch", "nodemon")));

gulp.task("clean-deploy", () => {
  return gulp
    .src(["./deploy/"], {
      allowEmpty: true,
    })
    .pipe(clean());
});

gulp.task("copy-dist-to-deploy", () => {
  return gulp
    .src([
      "./dist/**/*",
      "!./dist/cache/**/*",
      "!./dist/tsc/**/*",
      "!./dist/cache",
      "!./dist/tsc",
    ])
    .pipe(gulp.dest("./deploy/dist"));
});

gulp.task("copy-node-to-deploy", () => {
  return gulp
    .src(["./package.json", "./package-lock.json", "./Procfile"])
    .pipe(gulp.dest("./deploy"));
});

// task('deploy-heroku', (cb) => {
//   execSync('chmod +x deploy.sh');
//   execFile('./deploy.sh', (err) => {
//     console.log(err);
//     cb()
//   })
// })

gulp.task(
  "deploy",
  gulp.series(
    "build",
    "clean-deploy",
    "copy-dist-to-deploy",
    "copy-node-to-deploy"
    // 'deploy-heroku'
  )
);
