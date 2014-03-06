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