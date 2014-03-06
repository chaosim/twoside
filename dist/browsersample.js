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