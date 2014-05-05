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
      console.log('>>> err', err);
      if (err) {
        res.send(500);
        next();
        return;
      }

      console.log('>>> user', user);
      if (!user) {
        res.json(403, {err : 'Authentication failed'});
        next();
      }

      TokenController.create(user.id, config.TOKEN_EXPIRATION_TIME, function (err, token, data) {
        if (err) {
          res.send(500);
          next();
          return;
        }

        if (token) {
          res.json(200, data);
        } else {
          res.json(403, {err : 'Authentication failed'});
        }

        next();
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
    res.json(200, {token : 'foo'});
    next();
  }

  return [hasToken(), handler];
};


TokenEndpoint.revoke = function () {
  function handler(req, res, next) {
    next();
  }

  return [hasToken(), handler];
};
