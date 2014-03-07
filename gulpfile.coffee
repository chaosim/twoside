_ = require 'lodash'
gulp = require('gulp')
gutil = require 'gulp-util'
changed = require('gulp-changed')
cache = require('gulp-cached')
plumber = require('gulp-plumber')
clean = require('gulp-clean')
shell = require 'gulp-shell'
rename = require("gulp-rename")
coffee = require ('gulp-coffee')
concat = require('gulp-concat')
closureCompiler = require('gulp-closure-compiler')
size = require('gulp-size')
twoside = require './gulp-twoside'

task = gulp.task.bind(gulp)
watch = gulp.watch.bind(gulp)
src = gulp.src.bind(gulp)
dest = gulp.dest.bind(gulp)
from = (source, options={dest:folders_destjs, cache:'cache'}) ->
  options.dest ?= folders_destjs
  options.cache ?= 'cache'
  src(source).pipe(changed(options.dest)).pipe(cache(options.cache)).pipe(plumber())
GulpStream = src('').constructor
GulpStream::to = (dst) -> @pipe(dest(dst))#.pipe(livereload(tinylrServer))
GulpStream::pipelog = (obj, log=gutil.log) -> @pipe(obj).on('error', log)

rootOf = (path) -> path.slice(0, path.indexOf('/'))
midOf = (path) ->
  if (last=path.indexOf('/*'))<0 then last = path.lastIndexOf('/')
  path.slice(path.indexOf('/')+1, last)

# below will put output js files in wrong directory structure!!!
# coffee: [coffeeroot+'/*.coffee', coffeeroot+'/samples/**/*.coffee', coffeeroot+'/test/**/*.coffee']
# use the code below to solve this problem
patterns = (args...) ->
  for arg in args
    if typeof arg =='string' then pattern(arg)
    else arg
gulpto = (destbase, args...) ->
  for arg in args
    if typeof arg =='string' then pattern(arg, destbase)
    else arg
pattern = (src, destbase, options) -> new Pattern(src, destbase, options)
class Pattern
  constructor: (@src, @destbase, options={}) ->
    if typeof destbase=='object' then options = destbase; @destbase = undefined
    srcRoot = rootOf(@src)
    if not @destbase then @destbase = srcRoot
    if not options.desttail? then @desttail = midOf(@src)
#    console.log 'src:'+@src+' desttail:'+@desttail
    if @desttail then @dest = @destbase+'/'+@desttail
    else @dest = @destbase


folders_src = 'src'
folders_coffee = folders_src
folders_dest = 'dist'
folders_destjs = folders_dest
folders_destjsClient = folders_destjs+'/clientside'
folders_dist = 'dist'
folders_dev = 'dev'
folders_pulic = 'public'
folders_static = 'static'
folders_twosideInNpm = 'node_modules/twoside-in-npm'
folders_twosideInNpmClient = folders_twosideInNpm+'/clientside'

files_copy = (folders_src+'/'+name for name in ['**/*.js', '**/*.json', '**/*.jade', '**/*.html', '**/*.css', '**/*.tjv'])
files_coffee = [folders_coffee+'/**/*.coffee']
files_twosideInNpmCoffee = [folders_twosideInNpm+'/**/*.coffee']
files_twoside = [folders_destjs+'/module1.js', folders_destjs+'/module2.js', folders_destjs+'/module3.js', folders_destjs+'/browsersample.js']
files_twosideClient = [folders_destjsClient+'/module1.js', folders_destjsClient+'/module2.js', folders_destjsClient+'/module3.js', folders_destjsClient+'/browsersample.js']
files_twosideInNpm = [folders_twosideInNpm+'/**/*.js']
files_twosideInNpmClient = [folders_twosideInNpmClient+'/**/*.js']

files_concat = [folders_destjs+'/twoside.js'].concat([folders_twosideInNpm+'/npm1.js', folders_twosideInNpm+'/index.js']).concat(files_twoside)
files_concatClient = [folders_destjs+'/twoside.js'].concat([folders_twosideInNpmClient+'/npm1.js', folders_twosideInNpmClient+'/index.js']).concat(files_twosideClient)

task 'clean', -> src([folders_destjs].concat(files_twosideInNpm).concat([folders_twosideInNpmClient]), {read:false}) .pipe(clean())
task 'copy', -> from(files_copy, {cache:'copy'}).to(folders_dest)
task 'coffee', ->
  from(files_coffee, {cache:'coffee'}).pipelog(coffee({bare: true})).to(folders_destjs)
  from(files_twosideInNpmCoffee, {cache:'coffee2'}).pipelog(coffee({bare: true})).to(folders_twosideInNpm)
task 'twoside', ['copy', 'coffee'], (cb) ->
  for pat in patterns(files_twoside...)
    stream = src(pat.src).pipelog(twoside(folders_destjs, 'twoside-sample')).to(pat.dest)
    stream = src(pat.src).pipelog(twoside(folders_destjs, 'twoside-sample', {only_wrap_for_browser:true})).to(pat.dest+'/clientside')
  for pat in patterns(files_twosideInNpm...)
    stream = src(pat.src).pipelog(twoside(folders_twosideInNpm, 'twoside-in-npm')).to(pat.dest)
    stream = src(pat.src).pipelog(twoside(folders_twosideInNpm, 'browser-twoside-in-npm', {only_wrap_for_browser:true})).to(pat.dest+'/clientside')
  folders_twoside_lib = folders_destjs+'/lib'
  files_twoside_lib = [folders_twoside_lib+'/index.js', folders_twoside_lib+'/lib1.js', folders_twoside_lib+'/lib2.js']
  src(files_twoside_lib).pipelog(twoside(folders_twoside_lib, 'lib-package')).to(folders_twoside_lib)
  src(files_twoside_lib).pipelog(twoside(folders_twoside_lib, 'browser-lib-package', {only_wrap_for_browser:true})).to(folders_twoside_lib+'/clientside')
  src(files_twoside_lib[2]).pipelog(twoside(folders_twoside_lib, 'lib-package', {'/lib2':''}))
  .pipe(rename(basename: "lib2-as-lib-package")).to(folders_twoside_lib)
  src(files_twoside_lib[2]).pipelog(twoside(folders_twoside_lib, 'browser-lib-package', {only_wrap_for_browser:true, '/lib2':''}))
  .pipe(rename(basename: "lib2-as-browser-lib-package")).to(folders_twoside_lib+'/clientside')

gulp.task 'min', ['twoside'], ->
  src(files_concat).pipe(concat("twoside-sample.js")).to(folders_destjs)
  .pipe(closureCompiler()).pipe(rename(suffix: "-min"))
  .pipe(size(showFiles:true)).to(folders_destjs)
  src(files_concatClient).pipe(concat("twoside-sample.js")).to(folders_destjsClient)
  .pipe(closureCompiler()).pipe(rename(suffix: "-min"))
  .pipe(size(showFiles:true)).to(folders_destjsClient)
  src(folders_destjs+'/twoside.js').pipe(closureCompiler()).pipe(rename(suffix: "-min"))
  .pipe(size(showFiles:true)).to(folders_destjs)

task 'watch/copy', -> watch files_copy, ['copy']
task 'watch/coffee', -> watch files_coffee, ['coffee']
task 'watch/all', -> ['watch/copy', 'watch/coffee'] #
task 'build', ['copy', 'min']
task 'default',['build', 'watch:all']
