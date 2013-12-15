// module1.js
if (typeof window == 'object') {
  var m = twoside('/module1'), require = m.require, exports= m.exports, module = m.module;
}
(function(require, module1, module){

  module1.something = function(){
    console.log('in module1');
    return 'something in module1'
  }

})(require, exports, module)