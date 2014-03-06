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