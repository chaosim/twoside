### https://github.com/rgrove/lazyload ###

LazyLoad = do (doc=@document) ->
  pending = {}
  pollCount = 0
  queue = []
  env = null
  finish = ->
    p = pending
    if p
      callback = p.callback
      urls = p.urls
      urls.shift()
      pollCount = 0
      if !urls.length
        callback and callback.call(p.context, p.obj)
        queue.length and load()

  getEnv = ->
    ua = navigator.userAgent
    env = {async: doc.createElement('script').async == true}
    (env.webkit = /AppleWebKit\//.test(ua)) or (env.ie = /MSIE|Trident/.test(ua))\
      or (env.opera = /Opera/.test(ua)) or (env.gecko = /Gecko\//.test(ua)) or (env.unknown = true)

  load = (urls, callback, obj, context) ->
    nodes   = []
    env or getEnv()
    if urls
      urls = if typeof urls=='string' then [urls] else urls.concat()
      if env.async or env.gecko or env.opera
        queue.push({urls: urls, callback: callback, obj: obj, context: context})
      else
        i = 0; len = urls.length
        while i<len
          queue.push({urls: [urls[i]], callback: (if i==len-1 then callback else null), obj: obj, context: context})
    if pending or !(p = pending = queue.shift()) then return

    head or (head = doc.head or doc.getElementsByTagName('head')[0])
    pendingUrls = p.urls.concat()

    for url in pendingUrls
      node = doc.createElement('script')
      node.setAttribute 'src', url
      node.setAttribute('charset', 'utf-8')
      node.async = false
      if env.ie and 'onreadystatechange' in node and !('draggable' in node)
        node.onreadystatechange = ->
          if /loaded|complete/.test(node.readyState)
            node.onreadystatechange = null
            finish()
      else node.onload = node.onerror = finish
      nodes.push(node)
    for node in nodes then head.appendChild node      ng

  load
