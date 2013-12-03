// twoside.js

// make modules can be used on both server side and client side.

;(function(){

var inBrowser = function(){
  return (typeof module !== 'object' || typeof module.exports!=='object');
};

if (inBrowser()){
  var root = this;
  var oldtwoside = root.twoside;
  var twoside = root.twoside = function(path, define){
//  console.log('in module: '+path);
    var fullpath = normalize(twoside.base+path);
//  console.log('full path:'+fullpath);
    var module = twoside._modules[fullpath] = {exports:{}};
    var exports = module.exports;
    var modulePath =  fullpath.slice(0, fullpath.lastIndexOf("/")+1);
//  console.log('modulePath:'+modulePath);
    var require = function(path) {
      var module;
      if (path[0]=='.') path  = normalize(modulePath+path);
//    console.log('normalized path in require: '+path);
      module = twoside._modules[path];
      if (!module) throw path+' is undefined.'
      return module.exports;
    }
    root.exports = undefined;
    root.module = undefined;
    return function(windowExports, windowModule){define(require, exports, module)};
  };

// a proper base path can be set, default to '/'
  twoside.base = '/';
// module definition object cache.
  twoside._modules = {};

// To make node.js happy, we can alias some external module.
  twoside.alias = function(path, module){
//  console.log('alias: '+path);
    twoside._modules[path] = {exports: module};
  }

// e.g. n browser, if underscore have been imported before, we can alias it like below:
// twoside.alias('underscore', _);
// and then ,we can write "_ = require('underscore')", in this twoside module, and node.js will be happy.

  twoside.noConflict = function() {
    root.twoside = oldtwoside;
    return twoside;
  };

  root.oldRequire = root.require;
  root.require = function(path){
     if (path.slice(path.length-7)==='twoside'){
       return twoside;
     } else return root.oldRequire(path);
  }
// BEGIN path normalization
// below is a utility borrowed from github for path normalization, code related to scheme:// is removed.
// https://github.com/dfkaye/simple-path-normalize/blob/master/src/path-normalize.js
  /**
   * simple-path-normalize/src/path-normalize.js
   * david.kaye, @dfkaye
   * work in progress, as always :)
   *
   * !!!! bad fix needed/added 5/22/2013 for leading url schemes in browser/testem tests with qunit
   *
   */
  function normalize(path) {
    if (!path || path === '/') return '/';
    var target = [], src = path.split('/'), token;
    for (var i = 0, ii = src.length; i < ii; ++i) {
      token = src[i];
      if (token === '..') target.pop();
      else if (token !== '' && token !== '.') target.push(token);
    }
    /* for IE 6 & 7 - use path.charAt(i), not path[i] */
    return ((path.charAt(0) == '/' || path.charAt(0) == '.') ? '/' : '') + target.join('/').replace(/[\/]{2,}/g, '/');
  }
// END path normalization
} else {
  // if not in browser, set twoside as module.exports.
  module.exports = function(path, define){
    return function(exports, module) { // pass me the real module's exports and module, instead of twoside's exports and module.
      return define(require, exports, module);
    }
  }
};
}).call(this);