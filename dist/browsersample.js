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