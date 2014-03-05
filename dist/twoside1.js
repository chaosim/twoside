
/* https://github.com/rgrove/lazyload */
var LazyLoad,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

LazyLoad = (function(doc) {
  var env, finish, getEnv, load, pending, pollCount, queue;
  pending = {};
  pollCount = 0;
  queue = [];
  env = null;
  finish = function() {
    var callback, p, urls;
    p = pending;
    if (p) {
      callback = p.callback;
      urls = p.urls;
      urls.shift();
      pollCount = 0;
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        return queue.length && load();
      }
    }
  };
  getEnv = function() {
    var ua;
    ua = navigator.userAgent;
    env = {
      async: doc.createElement('script').async === true
    };
    return (env.webkit = /AppleWebKit\//.test(ua)) || (env.ie = /MSIE|Trident/.test(ua)) || (env.opera = /Opera/.test(ua)) || (env.gecko = /Gecko\//.test(ua)) || (env.unknown = true);
  };
  load = function(urls, callback, obj, context) {
    var head, i, len, node, nodes, p, pendingUrls, url, _i, _j, _len, _len1, _results;
    nodes = [];
    env || getEnv();
    if (urls) {
      urls = typeof urls === 'string' ? [urls] : urls.concat();
      if (env.async || env.gecko || env.opera) {
        queue.push({
          urls: urls,
          callback: callback,
          obj: obj,
          context: context
        });
      } else {
        i = 0;
        len = urls.length;
        while (i < len) {
          queue.push({
            urls: [urls[i]],
            callback: (i === len - 1 ? callback : null),
            obj: obj,
            context: context
          });
        }
      }
    }
    if (pending || !(p = pending = queue.shift())) {
      return;
    }
    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls.concat();
    for (_i = 0, _len = pendingUrls.length; _i < _len; _i++) {
      url = pendingUrls[_i];
      node = doc.createElement('script');
      node.setAttribute('src', url);
      node.setAttribute('charset', 'utf-8');
      node.async = false;
      if (env.ie && __indexOf.call(node, 'onreadystatechange') >= 0 && !(__indexOf.call(node, 'draggable') >= 0)) {
        node.onreadystatechange = function() {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            return finish();
          }
        };
      } else {
        node.onload = node.onerror = finish;
      }
      nodes.push(node);
    }
    _results = [];
    for (_j = 0, _len1 = nodes.length; _j < _len1; _j++) {
      node = nodes[_j];
      _results.push(head.appendChild(node(ng)));
    }
    return _results;
  };
  return load;
})(this.document);
