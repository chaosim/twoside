// module2.js
var module1 = require('./module1');
console.log('in module2');
console.log(module1.something());
exports.callModule1 = function(){
  return 'call '+module1.something()+' from module2';
}
exports.something = function(){
  console.log('something in module2');
  return 'something in module2'
}