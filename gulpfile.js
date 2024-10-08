const gulp = require('gulp')
const child = require('child_process');
const browserSync = require('browser-sync').create()

/**
 * Build the UI
 */
function buildUi() {
  return gulp.src('ui/src/**/*').pipe(gulp.dest('ui/dist'));
}
exports.buildUi = buildUi;

/**
 * Build the documentation site using Antora
 *
 * @returns {ChildProcess}
 */
function buildDocs() {
  return child.exec('npx antora generate antora-playbook.yml');
}
exports.buildDocs = buildDocs;

function buildDocsProd() {
  return child.exec('npx antora generate antora-playbook.yml');
}
exports.buildDocsProd = buildDocsProd;

function build() {
  return gulp.series(buildUi, buildDocs);
}
exports.build = gulp.series(buildUi, buildDocs);
exports.buildProd = gulp.series(buildUi, buildDocsProd);

function watchBuild() {
  browserSync.init({
    server: './dist',
    // Remove the "Connected to BrowserSync" message in the console
    notify: false
  })

  gulp.watch('ui/src/**/*', buildUi);

  gulp.watch(['docs/**/*', 'ui/dist/**/*', 'antora-playbook.yml'], buildDocs)

  gulp.watch('dist/**/*').on('change', browserSync.reload)
}
exports.watchBuild = watchBuild;
exports.develop = gulp.series(buildUi, buildDocs, watchBuild)
