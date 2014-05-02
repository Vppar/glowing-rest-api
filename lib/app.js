/**
 * Defines and exposes a factory for creating application instances.
 */
'use strict';

var pkg = require('../package.json');

var restify = require('restify');

var config = require('./config');
var setEndpoints = require('./endpoints');

var token = require('./middlewares/token');


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
  app.use(token(config.TOKEN_HEADER, config.TOKEN_PARAM_NAME));

  /** Creates the routes to the endpoints */
  setEndpoints(app);

  return app;
}



/** Exposes `Application` */
exports = module.exports = init;
