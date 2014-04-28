/**
 * Defines and exposes a factory for creating application instances.
 */
'use strict';

var pkg = require('../package.json');

var restify = require('restify');
var restifyOAuth2 = require('restify-oauth2');

var config = require('./config');
var setEndpoints = require('./endpoints');

/** Hooks required by retify-oauth2 */
var authenticationHooks = require('./hooks');


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

  /** Configure OAuth2. */
  restifyOAuth2.ropc(app, {
    hooks : authenticationHooks,
    tokenEndpoint : '/auth/token',
    tokenExpirationTime : config.TOKEN_EXPIRATION_TIME
  });

  /** Attaches the endpoints to the app */
  setEndpoints(app);

  return app;
}



/** Exposes `Application` */
exports = module.exports = init;
