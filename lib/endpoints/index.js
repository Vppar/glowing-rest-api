/**
 * Defines routes for the REST API.
 */

var _ = require('underscore');

var endpoints = {};

exports = module.exports = endpoints;


endpoints.attachers = [
  require('auth')
];


endpoints.attachTo = function (app) {
  _.each(this.modules, function (attacher) {
    if (!_.isFunction(attacher)) {
      throw('Invalid endpoint attacher: ' + attacher);
    }

    attacher(app);
  }, this);
};
