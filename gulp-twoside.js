/* jshint node: true */
'use strict';
var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');

module.exports = function(basepath, moduleName) {
  return es.through(function(file){
    if (file.isStream()) return this.emit('error', new Error("gulp-twoside: Streaming not supported"));
    var padpath = path.join(moduleName, file.path.slice(basepath.length));
    padpath = padpath.replace(/\\/g, '/');
    //console.log(padpath);
    var filename = padpath.slice(padpath.lastIndexOf("/")+1);
    if (filename==='twoside.js') { this.emit('data', file); return;}
//    console.log(filename);
    var head = "// wrap lines by gulp-twoside for providing twoside module\n(function(){\nvar exports, module, require, ts;\nif (typeof window === 'object') { ts = twoside('"+padpath+"'), require = ts.require, exports = ts.exports, module = ts.module;} \n(function(require, exports, module) {\n";
    var foot = "})(require, exports, module); // wrap line by gulp-twoside\n})(this)"
    //console.log(file);
    //dest = gutil.replaceExtension(file.path, ".js");
    file.contents = Buffer.concat([
      new Buffer(head),
      file.contents,
      new Buffer(foot)
    ]);
    file.path = gutil.replaceExtension(file.path, ".js");
    //console.log(file.path);
    this.emit('data', file);
  });
};
