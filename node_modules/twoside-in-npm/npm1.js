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