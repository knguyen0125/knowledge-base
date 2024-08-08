const { watch } = require('gulp')
const child = require('child_process');
const livereload = require('gulp-livereload')
const browserSync = require('browser-sync').create()

function build(cb) {
  const antora = child.spawn('npx', ['antora', 'generate', 'antora-playbook.yml']);
  antora.stdout.on('data', buffer => console.log(buffer.toString()))
  antora.stderr.on('data', buffer => console.log(buffer.toString()))
  antora.on('close', () => cb());
}
exports.build = build;

function watchBuild() {
  browserSync.init({
    server: './dist'
  })

  watch(['docs/**/*', 'ui/**/*', 'antora-playbook.yml'], { ignoreInitial: false }, build)

  watch('dist/**/*', { ignoreInitial: false }).on('change', browserSync.reload)
}
exports.watchBuild = watchBuild;
