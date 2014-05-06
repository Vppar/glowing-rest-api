/**
 * Defines the endpoint functions for token handling and generation.
 */

'use strict';

var config = require('../config');

var hasToken = require('../middlewares/hasToken');

var SessionController = require('../controllers/session');
var UserController = require('../controllers/user');

var SessionEndpoint = {};
exports = module.exports = SessionEndpoint;


SessionEndpoint.create = function () {
  return function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    UserController.authenticate(email, password, function (err, user) {
      if (err) {
        res.send(HttpCode.INTERNAL_ERROR);
        return;
      }

      if (!user) {
        res.json(HttpCode.UNAUTHORIZED, {err : 'Authentication failed'});
        return;
      }

      SessionController.create(user.id, config.TOKEN_EXPIRATION_TIME, function (err, token, data) {
        if (err) {
          res.send(HttpCode.INTERNAL_ERROR);
          return;
        }

        if (token) {
          res.json(HttpCode.CREATED, data);
        } else {
          res.json(HttpCode.UNAUTHORIZED, {err : 'Authentication failed'});
        }

      });
    });
  };
};


SessionEndpoint.refresh = function () {
  function handler(req, res, next) {
    next();
  }

  return [hasToken(), handler];
};


SessionEndpoint.getData = function () {
  function handler(req, res, next) {
    console.log('GET /token', req.token);
    console.log('?token:', req.query.token);
    res.json(201, {token : req.token});
  }

  return [hasToken(), handler];
};


SessionEndpoint.end = function () {
  function handler(req, res, next) {
    next();
  }

  return [hasToken(), handler];
};
