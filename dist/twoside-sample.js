
/* modules/twoside
 * make modules can be used on both server side and client side.
 */
(function() {
  var getStackTrace, normalize, oldexports, oldmodule, oldrequire, twoside;
  oldrequire = window.require;
  oldexports = window.exports;
  oldmodule = window.module;
  getStackTrace = function() {
    var obj;
    obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
  };
  twoside = window.twoside = function(path) {
    var exports, module, modulePath, require;
    window.require = oldrequire;
    window.exports = oldexports;
    window.module = oldmodule;
    path = normalize(path);
    exports = {};
    module = twoside._modules[path] = {
      exports: exports
    };
    modulePath = path.slice(0, path.lastIndexOf("/") + 1);
    require = function(path) {
      module = twoside._modules[path];
      if (module) {
        return module;
      }
      path = normalize(modulePath + path);
      module = twoside._modules[path];
      if (!module) {
        console.log(getStackTrace());
        throw path + ' is a wrong twoside module path.';
      }
      return module.exports;
    };
    return {
      require: require,
      exports: exports,
      module: module
    };
  };
  twoside._modules = {};

  /* we can alias some external modules. */
  twoside.alias = function(path, object) {
    return twoside._modules[path] = object;
  };

  /* e.g. n browser, if underscore have been imported before, we can alias it like below: */

  /* twoside.alias('underscore', _) */
  return normalize = function(path) {
    var head, target, token, _i, _len, _ref;
    if (!path || path === '/') {
      return '/';
    }
    target = [];
    _ref = path.split('/');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      token = _ref[_i];
      if (token === '..') {
        target.pop();
      } else if (token !== '' && token !== '.') {
        target.push(token);
      }
    }

    /* for IE 6 & 7 - use path.charAt(i), not path[i] */
    head = path.charAt(0) === '/' || path.charAt(0) === '.' ? '/' : '';
    return head + target.join('/').replace(/[\/]{2,}/g, '/');
  };
})();


/* javascript sample
if (typeof window==='object'){ var m = twoside('/module1'), exports= m.exports, module = m.module, require = m.module; }
(function(require, exports, module){
  // wrapped module definition
})(require, exports, module);
 */

// wrap lines by gulp-twoside for providing twoside module
(function(){
var exports, module, require, ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/module1.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
(function(require, exports, module) {
// module1.js

module1.something = function(){
  console.log('in module1');
  return 'something in module1'
}})(require, exports, module); // wrap line by gulp-twoside
})(this)
// wrap lines by gulp-twoside for providing twoside module
(function(){
var exports, module, require, ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/module2.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
(function(require, exports, module) {
// module2.js
var module1 = require('./module1');
console.log('in module2');
console.log(module1.something());
exports.callModule1 = function(){
  return 'call '+module1.something()+' from module2';
}
exports.something = function(){
  console.log('something in module2');
  return 'something in module2'
}})(require, exports, module); // wrap line by gulp-twoside
})(this)
// wrap lines by gulp-twoside for providing twoside module
(function(){
var exports, module, require, ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/browsersample.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
(function(require, exports, module) {
function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}
var module1 = require('./module1');
var module2 = require('./module2');
assert(module1.something()=='something in module1');
assert(module2.something()=='something in module2');
assert(module2.callModule1()=='call something in module1 from module2');
})(require, exports, module); // wrap line by gulp-twoside
})(this)