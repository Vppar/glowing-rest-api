/**
 * Defines the endpoint functions for token handling and generation.
 */

'use strict';

var config = require('../config');
var HttpStatus = require('../utils/httpStatus');
var LogController = require('../controllers/log');
var LogEndpoint = {};
exports = module.exports = LogEndpoint;

LogEndpoint.create = function (req, res) {
    return function (req, res, next) {
        var body = req.body;
        var ids = [];
        var logs = [];

        if (body.length) {
            logs = logs.concat(body);
        } else {
            logs.push(body);
        }

        for ( var ix in logs) {
            var log = logs[ix];
            LogController.logIt(log);
            ids.push(log.id);
        }

        res.json(HttpStatus.CREATED, ids);
        return;
    };
};

LogEndpoint.getById = function () {
    return function (req, res, next) {
        var log = req.body.log;
        // call controller
    };
};

LogEndpoint.getAll = function () {
    return function (req, res, next) {
        var log = req.body.log;
        // call controller
    };
};
