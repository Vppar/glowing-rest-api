/**
 * Defines the endpoint functions for token handling and generation.
 */

'use strict';

var config = require('../config');

var HttpStatus = require('../utils/httpStatus');
var hasToken = require('../middlewares/hasToken');
var hasRefreshToken = require('../middlewares/hasRefreshToken');

var SessionController = require('../controllers/session');
var UserController = require('../controllers/user');

var SessionEndpoint = {};
exports = module.exports = SessionEndpoint;


SessionEndpoint.create = function () {
  return function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    UserController.authenticate(email, password, function (err, user) {
      if (err) {
        res.json(HttpStatus.INTERNAL_SERVER_ERROR, err);
        return;
      }

      if (!user) {
        res.json(HttpStatus.UNAUTHORIZED, {
          message : 'Authentication failed'
        });
        return;
      }

      SessionController.create(user.id, config.TOKEN_EXPIRATION_TIME, function (err, token, data) {
        if (err) {
          res.json(HttpStatus.INTERNAL_SERVER_ERROR, err);
          return;
        }

        if (token) {
          res.json(HttpStatus.CREATED, data);
        } else {
          res.json(HttpStatus.UNAUTHORIZED, {
            message : 'Authentication failed'
          });
        }

      });
    });
  };
};


SessionEndpoint.refresh = function () {
  function handler(req, res) {
    var refreshToken = req.query.refresh;

    if (!refreshToken) {
      res.send(HttpStatus.BAD_REQUEST, {
        message : 'Refresh token required'
      });
      return;
    }


    SessionController.refresh(req.token, refreshToken, function (err, session) {
      if (err) {
        res.json(HttpStatus.INTERNAL_SERVER_ERROR, err);
        return;
      }

      if (session) {
        res.json(HttpStatus.CREATED, session);
        return;
      }

      res.json(HttpStatus.UNAUTHORIZED, {
        message : 'Invalid tokens'
      });
    });
  }

  return [hasToken(), hasRefreshToken(), handler];
};


SessionEndpoint.getData = function () {
  function handler(req, res) {
    console.log('GET /token', req.token);
    console.log('?token:', req.query.token);
    res.json(201, {token : req.token});
  }

  return [hasToken(), handler];
};


SessionEndpoint.end = function () {
  function handler() {
  }

  return [hasToken(), handler];
};
