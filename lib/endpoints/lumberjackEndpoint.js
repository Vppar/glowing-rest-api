/**
 * Defines the endpoint functions for log handling and generation.
 */

'use strict';

var config = require('../config');
var HttpStatus = require('../utils/httpStatus');
var LumberjackController = require('../controllers/lumberjackController');
var LogEndpoint = {};
exports = module.exports = LogEndpoint;

LogEndpoint.create = function (req, res) {
    return function (req, res, next) {
        var log = req.body;

        // LOG
        LumberjackController.logIt(log, null);
        // VALIDATE
        res.json(HttpStatus.CREATED, log);
        // RESPONSE
        /*
         * if (sucessfull.length === ids.length) { res.json(HttpStatus.CREATED,
         * sucessfull); } else if (sucessfull > 0) {
         * res.json(HttpStatus.ACCEPTED, sucessfull); } else if (sucessfull ===
         * 0) { res.json(HttpStatus.INTERNAL_SERVER_ERROR, sucessfull); }
         */

        return;
    };
};

LogEndpoint.exists = function () {
    return function (req, res, next) {
        var ids = req.query.q;
        var user = "tiosam@tutnscorp.com";
        // LOG
        LumberjackController.exists(user, ids, null);

        // VALIDATE
        res.json(HttpStatus.CREATED, ids);
    };
};
