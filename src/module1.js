// module1.js

require('./twoside')('/module1', exports, module, function(require, module1){

module1.something = function(){
  console.log('in module1');
  return 'something in module1'
}

})