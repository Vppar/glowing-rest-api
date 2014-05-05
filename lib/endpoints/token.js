/**
 * Defines the endpoint functions for token handling and generation.
 */

'use strict';

var config = require('../config');

var hasToken = require('../middlewares/hasToken');

var TokenController = require('../controllers/token');
var UserController = require('../controllers/user');

var TokenEndpoint = {};
exports = module.exports = TokenEndpoint;


TokenEndpoint.create = function () {
  return function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    UserController.authenticate(email, password, function (err, user) {
      if (err) {
        res.send(500);
        return;
      }

      if (!user) {
        res.json(403, {err : 'Authentication failed'});
        return;
      }

      TokenController.create(user.id, config.TOKEN_EXPIRATION_TIME, function (err, token, data) {
        if (err) {
          res.send(500);
          return;
        }

        if (token) {
          res.json(200, data);
        } else {
          res.json(403, {err : 'Authentication failed'});
        }

      });
    });
  };
};


TokenEndpoint.refresh = function () {
  function handler(req, res, next) {
    next();
  }

  return [hasToken(), handler];
};


TokenEndpoint.getData = function () {
  function handler(req, res, next) {
    console.log('GET /token', req.token);
    res.json(200, {token : req.token});
  }

  return [hasToken(), handler];
};


TokenEndpoint.revoke = function () {
  function handler(req, res, next) {
    next();
  }

  return [hasToken(), handler];
};
