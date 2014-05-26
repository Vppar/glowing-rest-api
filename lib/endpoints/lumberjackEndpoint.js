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
        var user = null;
        //get user
        if(req.user){
            user = req.user.id;
        }else{
            user =  'default';
        }

        // LOG
        LumberjackController.logIt(user, log, function (err, result) {
            // Review interal error codes.
            var message = {
                "message" : "The server encountered an error and could not complete your request!",
                "code" : "TTS 666"
            };

            // error
            if (err) {
                return res.json(HttpStatus.INTERNAL_SERVER_ERROR, message);
            }

            // one log successfull created
            if (!log.length && result.length === 1) {
                return res.json(HttpStatus.CREATED, result);
            }
            // all logs successful created
            if (result && log.length && log.length === result.length) {
                return res.json(HttpStatus.CREATED, result);
            }
            // partial logs persisted
            if (result && result.length > 1) {
                return res.json(HttpStatus.ACCEPTED, result);
            }
            // error
            return res.json(HttpStatus.INTERNAL_SERVER_ERROR, message);
        });
    };
};

LogEndpoint.exists =
    function () {
        return function (req, res, next) {
            var ids = req.query.q;
            var user = null;
            
            //get user
            if(req.user){
                user = req.user.id;
            }else{
                user =  'default';
            }

            // LOG
            LumberjackController.exists(user, ids, function (err, result) {
                        if (err) {
                            var message =
                                {
                                    "message" : "The server encountered an error and could not complete your request!!",
                                    "code" : "TTS 500"
                                };
                            return res.json(HttpStatus.INTERNAL_SERVER_ERROR, message);
                        }
                        if (!result) {
                            return res.json(HttpStatus.OK, []);
                        }
                        return res.json(HttpStatus.OK, result);
                    });
        };
    };
