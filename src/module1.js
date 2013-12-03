// module1.js

require('./twoside')('/module1', function(require, exports){
// require('./twoside')('/module1', function(require){
// require('./twoside')('/module1', function(require, exports, module){
  exports.something = function(){
    console.log('in module1');
    return 'something in module1'
  }
})(exports, module); // end twoside