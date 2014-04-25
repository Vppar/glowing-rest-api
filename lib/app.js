/**
 * Defines and exposes a factory for creating application instances.
 */

var pkg = require('../package.json');

var restify = require('restify');
var config = require('./config');
var endpoints = require('./endpoints');
var restifyOAuth2 = require('retify-oauth2');

/** Hooks required by retify-oauth2 */
var authenticationHooks = require('./hooks');


/** Exposes `Application` */
exports = module.exports = init;


/**
 * Initializes an instance of the REST API application.
 * @param {Object?} options
 * @return {restify.Server}
 */
function init(options) {
  var server = new restify.Server({
    name : pkg.name,
    version : pkg.version,
    certificate : config.SSL_CERTIFICATE,
    key : config.SSL_KEY
  });

  server.use(restify.authorizationParser());
  server.use(restify.bodyParser({
    mapParams: false
  }));

  /** Configure OAuth2. */
  restifyOAuth2.ropc(server, {
    hooks : authenticationHooks,
    tokenEndpoint : '/auth/token',
    tokenExpirationTime : config.TOKEN_EXPIRATION_TIME
  });

  /** Attaches the endpoints to the app */
  endpoints.attachTo(server);

  return server;
}

