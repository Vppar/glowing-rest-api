/**
 * Defines the endpoint functions for token handling and generation.
 */

'use strict';

var config = require('../config');

var HttpStatus = require('../enum/httpStatus');
var RequestError = require('../enum/requestError');
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
        res.json(HttpStatus.INTERNAL_SERVER_ERROR, {
          message : err.message,
          code : RequestError.SERVER_ERROR
        });
        return;
      }

      if (!user) {
        res.json(HttpStatus.UNAUTHORIZED, {
          message : 'Authentication failed',
          code : RequestError.AUTHENTICATION_FAILED
        });
        return;
      }

      SessionController.create(user.id, config.TOKEN_EXPIRATION_TIME, function (err, token, data) {
        if (err) {
          res.json(HttpStatus.INTERNAL_SERVER_ERROR, {
            message : err.message,
            code : RequestError.SERVER_ERROR
          });
          return;
        }

        if (data) {
          res.json(HttpStatus.CREATED, data);
        } else {
          res.json(HttpStatus.UNAUTHORIZED, {
            message : 'Authentication failed',
            code : RequestError.AUTHENTICATION_FAILED
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
      res.json(HttpStatus.BAD_REQUEST, {
        message : 'Refresh token required',
        code : RequestError.MISSING_REQUIRED_PARAMETER
      });
      return;
    }


    SessionController.refresh(req.token, refreshToken, function (err, session) {
      if (err) {
        res.json(HttpStatus.INTERNAL_SERVER_ERROR, {
          message : err.message,
          code : RequestError.SERVER_ERROR
        });
        return;
      }

      if (session) {
        res.json(HttpStatus.CREATED, session);
        return;
      }

      res.json(HttpStatus.UNAUTHORIZED, {
        message : 'Invalid tokens',
        code : RequestError.INVALID_TOKEN
      });
    });
  }

  return [/*requireSession(), bodyProperty('refresh'),*/ handler];
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
  function handler(req, res) {
    next();
  }

  return [hasToken(), handler];
};
