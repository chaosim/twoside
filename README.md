
# Installation
Just copy twoside.js to your folder.

# description
<h2>twoside.js: make module can be used in both server side and client side.</h2>
<h3>How big is twoside.js?</h3>
<p> about 1400 bytes after being minified. </p>
<h3> what does twoside.js do? </h3>
<p> make module can be used in both server side and client side. </p>
<h3> what does twoside not do? </h3>
<p> twoside.js is not a loader. </p>
<p> twoside.js does not process cyclic require in client side. </p>

## usage
  in browser, just add `<script src="path/to/twoside.js">` before the modules you need export and require.
  in module, wrap real content with the code like below:
      require('path/to/twoside')('/module1', function(require, exports){
      // require('./twoside')('/module1', function(require){
      // require('./twoside')('/module1', function(require, exports, module){

      var x = require('someModule');
      // exports.something = ......

      })(exports, module); // end twoside

  see the source code in twoside.js for more information.

##Web sites
  the project's repository is on github <https://github.com/chaosim/twoside>.<br/>