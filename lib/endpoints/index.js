/**
 * Defines routes for the REST API.
 */

'use strict';

var _ = require('underscore');

var ENDPOINT_MODULES = [
  require('./auth')
];



function setEndpoints(app) {
  _.each(ENDPOINT_MODULES, function (setter) {
    if (!_.isFunction(setter)) {
      throw('Invalid endpoint attacher: ' + setter);
    }

    setter(app);
  });
}



exports = module.exports = setEndpoints;
