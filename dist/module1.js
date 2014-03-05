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