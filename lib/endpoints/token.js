/**
 * Defines the endpoint functions for token handling and generation.
 */

var hasToken = require('../middlewares/hasToken');

var TokenController = require('../controllers/token');


var TokenEndpoint = {};
exports = module.exports = TokenEndpoint;


TokenEndpoint.create = function () {
  return function (req, res, next) {
    res.json(200, {foo : 'bar'});
  }
};


TokenEndpoint.refresh = function () {
  function handler(req, res, next) {
  }

  return [hasToken(), handler];
};


TokenEndpoint.getData = function () {
  function handler(req, res, next) {
  }

  return [hasToken(), handler];
};


TokenEndpoint.revoke = function () {
  function handler(req, res, next) {
  }

  return [hasToken(), handler];
};
