
/* twoside.js(generated from twoside.coffee)
make modules can be used on both server side and client side.
use gulp-twoside to wrap your module.

below is a sample module that have been wrapped by gulp-twoside:

// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {
if (typeof window === 'object') { ts = twoside('twoside-sample/module1.js'), require = ts.require, exports = ts.exports, module = ts.module;}
// module1.js
exports.something = function(){
  console.log('in module1');
  return 'something in module1'
}
// wrap line by gulp-twoside
})(require, exports, module);
 */
(function() {
  var getStackTrace, normalize, removeExtname, twoside;
  getStackTrace = function() {
    var obj;
    obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
  };
  removeExtname = function(path) {
    var length;
    length = path.length;
    if (path.slice(length - 3) === '.js') {
      return path.slice(0, length - 3);
    } else if (path.slice(length - 7) === '.coffee') {
      return path.slice(0, length - 7);
    } else {
      return path;
    }
  };
  twoside = window.twoside = function(path) {
    var exports, filename, lastSlashIndex, module, modulePath, require;
    lastSlashIndex = path.lastIndexOf("/");
    if (lastSlashIndex >= 0) {
      modulePath = path.slice(0, lastSlashIndex);
      filename = removeExtname(path.slice(lastSlashIndex + 1));
    } else {
      console.log(getStackTrace());
      throw 'should give a proper twoside module path.';
    }
    path = removeExtname(normalize(path));
    exports = {};
    module = twoside._modules[path] = {
      exports: exports
    };
    if (filename === 'index') {
      twoside._modules[modulePath] = module;
    }
    require = function(path) {
      var requiredModule;
      requiredModule = twoside._modules[path];
      if (requiredModule) {
        return requiredModule.exports;
      }
      path = normalize(modulePath + '/' + removeExtname(path));
      requiredModule = twoside._modules[path];
      if (!requiredModule) {
        console.log(getStackTrace());
        throw path + ' is a wrong twoside module path.';
      }
      return requiredModule.exports;
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

// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {var ts;
if (typeof window === 'object') { ts = twoside('twoside-in-npm/npm1.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
module.exports = function() {
  console.log('in npm1');
  return 'npm1';
};

// wrap line by gulp-twoside
})(require, exports, module);
// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {var ts;
if (typeof window === 'object') { ts = twoside('twoside-in-npm/index.js'), require = ts.require, exports = ts.exports, module = ts.module;} 

/* npm-compatible index.js */
var exports;

exports = module.exports = {
  methodInIndex: function() {
    console.log('twoside-in-npm/index.js');
    return 'twoside-in-npm/index.js';
  }
};

exports.npm1 = require('./npm1');

// wrap line by gulp-twoside
})(require, exports, module);
// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {var ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/module1.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
// module1.js

exports.something = function(){
  console.log('in module1');
  return 'something in module1'
}
// wrap line by gulp-twoside
})(require, exports, module);
// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {var ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/module2.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
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
}
// wrap line by gulp-twoside
})(require, exports, module);
// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {var ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/module3.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
// module3.js
var twosideInNpm = require('twoside-in-npm');
console.log(JSON.stringify(twoside._modules));
console.log(JSON.stringify(twosideInNpm));
twosideInNpm.methodInIndex()
twosideInNpm.npm1()
// wrap line by gulp-twoside
})(require, exports, module);
// wrap lines by gulp-twoside for providing twoside module
var exports, module, require;
(function(require, exports, module) {var ts;
if (typeof window === 'object') { ts = twoside('twoside-sample/browsersample.js'), require = ts.require, exports = ts.exports, module = ts.module;} 
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

// wrap line by gulp-twoside
})(require, exports, module);