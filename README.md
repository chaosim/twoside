
# Installation
Just npm install twoside, and then copy twoside.js to your folder.

# what's new in 0.1.7
* display stack trace on console when require(path) get a wrong path, which should be helpful for debugging.

# description
make module can be used in both server side and client side.

#### How big is twoside.js?</h3>
About 1000 bytes after being minified by uglifyjs .

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

    if (typeof window==='object'){ var m = twoside('/module1'), exports= m.exports, module = m.module, require = m.module; }
    (function(require, exports, module){
      // wrapped module definition
    })(require, exports, module);

If you prefer coffee-script, just add this line to your module and indent all of you code:

    if typeof window=='object' then {require, exports, module} = twoside('/module1')
    do (require=require, exports=exports, module=module) ->
      indent module definition

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