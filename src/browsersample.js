if (typeof window == 'object') {
  var m = twoside('/browsersample'), require = m.require, exports= m.exports, module = m.module;
}
(function(require, module1, module){
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

})(require, exports, module)