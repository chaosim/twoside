
# Installation
Just ·npm install twoside·, and then copy twoside.js to your folder.

# description
make module can be used in both server side and client side.

#### How big is twoside.js?</h3>
About 1400 bytes after being minified.

#### what does twoside.js do? 
Make module can be used in both server side and client side. 

#### What does twoside not do?
twoside.js is not a loader.
twoside.js does not process cyclic require in client side.

#### Can twoside.js be used with require.js, sea.js, browserify?
I does not test these cases. 

## usage
In browser, just add `<script src="path/to/twoside.js">` before the modules that need export and require.

In module, wrap the real module code with the lines like below:

    require('path/to/twoside')('/module1', function(require, exports){
    // require('./twoside')('/module1', function(require){
    // require('./twoside')('/module1', function(require, exports, module){

    var x = require('someModule');
    // exports.something = ......

    })(exports, module); // end twoside

for client side's external module, alias can be added by `twoside.alias(name, object)`. e.g. `twoside.alias('underscore', _)`.

see the source code in twoside.js for more information.  

## web sites
  The project's repository is on github <https://github.com/chaosim/twoside>.

## license
Simplified BSD License, see LICENSE

## my other npm modules
peasy: an easy but powerful parser.<br/>
npm install peasy, https://npmjs.org/package/twoside, https://github.com/chaosim/peasy<br/>

daonode: functional logic solver and compiler.<br/>
npm install daonode, https://npmjs.org/package/daonode, https://github.com/chaosim/daonode<br/>

node-utilities: an easy but powerful parser.<br/>
npm install node-utilities, https://npmjs.org/package/node-utilities, https://github.com/chaosim/node-utils<br/>

