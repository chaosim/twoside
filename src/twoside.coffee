### modules/twoside
# make modules can be used on both server side and client side.
###
( ->
  root = null
  inBrowser = -> typeof window == 'object' and typeof exports != 'object'
  if inBrowser()
    root = this
    if root.exports is undefined then root.exports  = null
    if root.module is undefined then root.module = null
    twoside = root.twoside = _modules: {}
    ### To make node.js happy, we can alias some external module.###
    twoside.alias = (path, object) -> twoside._modules[path] = {exports: object}
    ### e.g. n browser, if underscore have been imported before, we can alias it like below: ###
    # twoside.alias('underscore', _)

    normalize = (path) ->
      if !path || path == '/' then return '/'
      target = []
      for token in path.split('/')
        if token == '..' then target.pop()
        else if token!= '' and token != '.' then target.push(token)
      ### for IE 6 & 7 - use path.charAt(i), not path[i] ###
      head = if path.charAt(0)=='/' or path.charAt(0)=='.' then '/' else ''
      head + target.join('/').replace(/[\/]{2,}/g, '/')

    root.require = (twosidePath) ->
      if (twosidePath.slice(twosidePath.length-7)!='twoside') then return root.oldRequire(twosidePath)
      (path, _, __, define) ->
        path = normalize(path)
        exports  = {}
        module = twoside._modules[path] = {exports:exports}
        modulePath =  path.slice(0, path.lastIndexOf("/")+1)
        require = (path) ->
          if (path[0]=='.') then path = normalize(modulePath+path)
          module = twoside._modules[path]
          if !module then throw path+' is undefined.'
          module.exports
        define(require, exports, module)

  else module.exports = (path, exports, module, define) -> define(require, exports, module)

).call(this)

# coffee-script sample
# require('twoside') '/browsersample', exports, module, function(require, exports, module) ->
#   indent module definition

### javascript sample
require('./twoside')('/browsersample', exports, module, function(require, exports, module){
  // wrapped module definition
});
###