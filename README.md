
# Installation
Just npm install twoside, and then copy twoside.js to your folder.

# what's new in 0.1.8
  * use gulpjs to build
  * now twoside can make npm package and require folder by putting an index.js in it.
  * modify and add new stuffs in nodesample.js, twoside-samples.js, twoside-in-npm twoside-in-npm
  * minify by google-closure(using gulp-closure-compiler), twoside.js is 976 bytes now.

# description
make module can be used in both server side and client side.

#### How big is twoside.js?</h3>
About 1000 bytes after being minified by uglifyjs.

#### what does twoside.js do? 
Make module can be used in both server side and client side. 

#### What does twoside not do?
twoside.js is not a loader.
twoside.js does not process cyclic require in client side.

#### Can twoside.js be used with require.js, sea.js, browserify?
I does not test these cases. 

## usage
In browser, just add `<script src="path/to/twoside.js">` before the modules that need export and require.

use gulp-twoside.js as a gulpjs plugins to wrap your module code automatically.

or wrap the code manually as below:

```javascript
var require, exports, module;
(function(require, exports, module){
  if (typeof window==='object'){ var m = twoside('/module1'), exports= m.exports, module = m.module, require = m.module; }
  // wrapped module definition
})(require, exports, module);
```

If you prefer coffee-script, just add this line to your module and indent all of you code:

```coffee-script
    `var require, exports, module;`
    do (require=require, exports=exports, module=module) ->
      if typeof window=='object' then {require, exports, module} = twoside('/module1')
      your module definition
```

### javascript sample

for client side's external module, alias can be added by `twoside.alias(name, object)`. e.g.

    twoside.alias('underscore', _);

see the source code in twoside.js for more information.  

## web sites
  The project's repository is on github <https://github.com/chaosim/twoside>.

## license
Simplified BSD License, see LICENSE

## my bower module
  a simple multiple panes splitter for angularjs: https://github.com/chaosim/splitter   bower install splitter