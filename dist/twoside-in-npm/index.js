
/* npm-compatible index.js */
var exports;

exports = module.exports = {
  methodInIndex: function() {
    console.log('twoside-in-npm/index.js');
    return 'twoside-in-npm/index.js';
  }
};

exports.npm1 = require('./npm1');
