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
        console.log(123123);
        // LOG
        LumberjackController.logIt(log, function (err, result) {
            //error
            if (err) {
                return res.json(HttpStatus.INTERNAL_SERVER_ERROR, err);
            }
            
            //one log successfull created
            if (!log.length && result.length === 1) {
                return res.json(HttpStatus.CREATED, result);
            }
            //all logs successful created
            if (result && log.length && log.length === result.length) {
                return res.json(HttpStatus.CREATED, result);
            }
            //partial logs persisted            
            if (result && result.length > 1) {
                return res.json(HttpStatus.ACCEPTED, result);
            }
            var message = {
                "message" : "Call some admin please!",
                "code" : "UNKNOW 777"
            };
            
            //error
            return res.json(HttpStatus.INTERNAL_SERVER_ERROR, message);
        });
    };
};

LogEndpoint.exists = function () {
    return function (req, res, next) {
        var ids = req.query.q;
        var user = "tiosam@tutnscorp.com";

        // LOG
        LumberjackController.exists(user, ids, function (err, result) {
            if (err) {
                var message = {
                    "message" : "Call some admin please!",
                    "code" : "EL500"
                };
                return res.json(HttpStatus.INTERNAL_SERVER_ERROR, message);
            }
            if (!result) {
                return res.json(HttpStatus.OK, []);
            }
            return res.json(HttpStatus.OK, result);
        });

        // VALIDATE

    };
};
