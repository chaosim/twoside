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