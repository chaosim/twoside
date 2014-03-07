
### description
make module can be used in both server side and client side.

### usage
Just `npm install twoside`, and then copy twoside.js to your folder.

To play with gulpjs, please copy gulp-twoside.js to your folder, too.

Use gulp-twoside.js as a gulpjs plugins to wrap your module code automatically.

In browser, just add `<script src="path/to/twoside.js">` before the modules that need exports or require.

Or wrap the code manually as below:

```javascript
var require, exports, module;
(function(require, exports, module){
  if (typeof window==='object'){ var m = twoside('/module1'), exports = m.exports, module = m.module, require = m.module; }
  // wrapped module definition
})(require, exports, module);
```

If you prefer coffee-script, just add these lines to your module and indent all of you code:

```coffee-script
    `var require, exports, module;`
    do (require=require, exports=exports, module=module) ->
      if typeof window=='object' then {require, exports, module} = twoside('/module1')
      your module definition
```

#### alias for existed module

For client side's external module, alias can be added by `twoside.alias(name, object)`. e.g.

```javascript
   twoside.alias('underscore', _);
```

see the source code in twoside.js for more information.
(twoside.js: 100 lines,  twoside.coffee: 70 lines,  gulp-twoside.js: 50 lines).

### what's new in 0.1.9
  * add pathMap as third argument for gulp-twoside plugin, so that the module name in browser can be renamed, the packages can be reorganized, see src/lib and gulpfile.coffee for examples.
  * the first parameter "basepath" of gulp-twoside plugin  add __dirname automatically now.
  * path in `twoside(path)` can be a package name now. 


### FAQ
**How big is twoside.js?** 
* About 1000 bytes after being minified(google-closure-compiler).

**What does twoside not do?** 
* twoside.js is not a loader, please load the module by `<script>` tag or other methods.
* twoside.js does not process cyclic require.

**Can twoside.js be used with require.js, sea.js, browserify?** 
* Perhaps not. I do not test these cases.

### web sites
  The project's repository is on github <https://github.com/chaosim/twoside>.

### license
Simplified BSD License, see LICENSE

### my bower module
  a simple multiple panes splitter for angularjs: https://github.com/chaosim/splitter   `bower install splitter`