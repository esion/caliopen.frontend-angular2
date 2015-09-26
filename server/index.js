var express = require('express');
var app = module.exports.app = exports.app = express();

var globSync   = require('glob').sync;
var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

// Log proxy requests
var morgan  = require('morgan');
app.use(morgan('dev'));

mocks.forEach(function(route) { route(app); });
proxies.forEach(function(route) { route(app); });

//static files provided related to root path
app.use('/', express.static('public'));
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Caliopen app listening at http://%s:%s', host, port);
});
