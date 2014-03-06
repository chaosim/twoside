var assert = require('assert');
var module1 = require('./module1');
var module2 = require('./module2');
assert(module1.something()=='something in module1');
assert(module2.something()=='something in module2');
assert(module2.callModule1()=='call something in module1 from module2');

var twosideInNpm = require('twoside-in-npm');
console.log(JSON.stringify(twosideInNpm));
assert(twosideInNpm.methodInIndex()=='twoside-in-npm/index.js');
assert(twosideInNpm.npm1()=='npm1')
