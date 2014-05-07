/**
 * Defines the endpoint functions for token handling and generation.
 */

'use strict';

var config = require('../config');

var hasToken = require('../middlewares/hasToken');

var LumberjackController = require('../controllers/lumberjack');
var LumberjackEndpoint = {};
exports = module.exports = LumberjackEndpoint;

LumberjackEndpoint.create = function (req, res) {
    return function (req, res, next) {
        var log = req.body;
        console.log(req.body);
        
        // call controller
        //LumberjackController.logIt();
        res.json(200, {asd:'asd', fds:213, asdasd:'asafsdf'});
        return;
    };
};

LumberjackEndpoint.getById = function () {
    return function (req, res, next) {
        var log = req.body.log;
        // call controller
    };
};

LumberjackEndpoint.getAll = function () {
    return function (req, res, next) {
        var log = req.body.log;
        // call controller
    };
};


