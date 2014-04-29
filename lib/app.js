/**
 * Defines and exposes a factory for creating application instances.
 */
'use strict';

var pkg = require('../package.json');

var restify = require('restify');

var config = require('./config');
var setEndpoints = require('./endpoints');
var middleware = require('./middleware');


/**
 * Initializes an instance of the REST API application.
 * @param {Object?} options
 * @return {restify.Server}
 */
function init() {
  var app = restify.createServer({
    name : pkg.name,
    version : pkg.version,
    certificate : config.SSL_CERTIFICATE,
    key : config.SSL_KEY
  });

  app.use(restify.authorizationParser());
  app.use(restify.bodyParser({
    mapParams: false
  }));

  // Sets the `token` property in the request object.
  app.use(middleware.token('API-Token', 'token'));

  /** Attaches the endpoints to the app */
  setEndpoints(app);

  return app;
}



/** Exposes `Application` */
exports = module.exports = init;
