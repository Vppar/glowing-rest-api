/**
 * Defines and exposes a factory for creating application instances.
 */
'use strict';

var pkg = require('../package.json');

var express = require('express');
var connect = require('connect');

var config = require('./config');
var routes = require('./routes');

var token = require('./middlewares/token');


/**
 * Initializes an instance of the REST API application.
 * @param {Object?} options
 * @return {restify.Server}
 */
function init() {
  var app = express();
  
  app.disable('x-powered-by');
  app.set('title', config.API_TITLE);

  app.use(connect.json());

  // Sets the `token` property in the request object.
  app.use(token(config.TOKEN_HEADER, config.TOKEN_PARAM_NAME));

  /** Creates the routes to the endpoints */
  routes(app);

  return app;
}



/** Exposes `Application` */
exports = module.exports = init;
