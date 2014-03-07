// module2.js
console.log('in /lib/lib2');
var lib1 = require('./lib1');
exports.something1 = lib1.something;
console.log(lib1.something());
exports.callModule1 = function(){
  return 'call '+lib1.something()+' from /lib/lib2';
}
exports.something2 = exports.something = function(){
  console.log('something in /lib/lib2');
  return 'something in /lib/lib2'
}