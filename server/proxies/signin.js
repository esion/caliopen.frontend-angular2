var proxyPath = '/signin';

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  var proxy = require('http-proxy').createProxyServer({
    xfwd: true
  });
  var path = require('path');

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request
    req.url = path.join(proxyPath, req.url);
    proxy.web(req, res, { target: 'http://0.0.0.0:6543' });
  });
};
