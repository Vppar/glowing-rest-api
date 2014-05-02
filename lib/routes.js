/**
 * Defines the routes for each endpoint.
 */

'use strict';

var token = require('./endpoints/token');


/**
 * Sets the routes to the endpoints in the given application.
 * @param {Object} app Application listening to the routes.
 */
function routes(app) {

  app.post('/token', TokenEndpoint.create());
  app.get('/token', TokenEndpoint.getData());
  app.del('/token', TokenEndpoint.revoke());

  app.post('/token/refresh', TokenEndpoint.refresh());

}


/** Exposes the routes setter. */
exports = module.exports = routes;
