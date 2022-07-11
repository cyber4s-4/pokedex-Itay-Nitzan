const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

const webpackConfig = require('./webpack.config.js');

// Removes previous dist
gulp.task('clean', () => {
  return gulp.src('./dist', { allowEmpty: true })
    .pipe(clean());
});

// Creates js bundle from several js files
gulp.task('bundle', () => {
  return webpack(webpackConfig)
    .pipe(gulp.dest('./dist'))
});

// Converts scss to css
gulp.task('scss', () => {
  return gulp.src('./src/client/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
});

// Transfers index
gulp.task('index', () => {
  return gulp.src(['./src/client/**/*.html'])
    .pipe(gulp.dest('./dist'));
});

// Transfers index
gulp.task('icon', () => {
  return gulp.src(['./src/client/favicon.ico'])
    .pipe(gulp.dest('./dist'));
});

// Watch scss files
gulp.task('watch-scss', () => {
  return gulp.watch('./src/client/**/*.scss', gulp.series('scss'));
});

// Watch html files
gulp.task('watch-html', () => {
  return gulp.watch(['./src/client/**/*.html'], gulp.series('index'));
});

// Watch tsc files
gulp.task('watch-tsc', () => {
  return gulp.watch('./dist/tsc/client/**/*.js', gulp.series('bundle'));
});

// Initial ts compile
gulp.task('tsc', cb => {
  exec('tsc', () => cb());
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
  const tsc = exec('tsc -w --preserveWatchOutput --pretty');

  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));

  tsc.on('close', code => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task('express', () => {
  const tsc = exec('nodemon --watch ./src/server ./src/server/server.ts');
  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));
});

// Build all
gulp.task('build', gulp.series(
  'clean',
  'scss',
  'index',
  'icon',
  'tsc',
  'bundle',
));

// Heroku copy dist files
gulp.task('heroku-copy-dist', () => {
  return gulp.src([
    './dist/app.js',
    './dist/app.js.map',
    './dist/favicon.ico',
    './dist/index.html',
    './dist/styles.css',
  ])
    .pipe(gulp.dest('./deploy/dist'));
});

// Heroku copy root files
gulp.task('heroku-copy-root', () => {
  return gulp.src([
    './package.json',
    './package-lock.json',
    './Procfile',
    './dist/tsc/server/server.js',
  ])
    .pipe(gulp.dest('./deploy'));
});

// Heroku clean files
gulp.task('heroku-clean', () => {
  return gulp.src([
    './deploy/server.js',
    './deploy/Procfile',
    './deploy/package.json',
    './deploy/package-lock.json',
    './deploy/dist',
  ], { allowEmpty: true })
    .pipe(clean());
});

// Heroku deploy
gulp.task('deploy', gulp.series(
  'heroku-clean',
  'build',
  'heroku-copy-root',
  'heroku-copy-dist',
));

// Run all (without express)
gulp.task('dev', gulp.series(
  'build',
  gulp.parallel(
    'watch-scss',
    'watch-html',
    'watch-tsc',
    'tsc-w',
  ),
));

// Run all together
gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch-scss',
    'watch-html',
    'watch-tsc',
    'tsc-w',
    'express',
  ),
));
