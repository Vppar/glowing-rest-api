'use strict';

var ElasticalBackend = require('../backends/elasticalBackend');
var queries = require('./queries');

var LumberjackStorage = {};
exports = module.exports = LumberjackStorage;

LumberjackStorage.getLogByIdAndUser = function (user, id, callback) {
    var qryObj = queries.getByUserAndId(user, id);

    ElasticalBackend.getLog(qryObj, function (err, log) {
        if (err) {
            return callback(err, null);
        }

        if (!log) {
            return callback(null, null);
        }

        return callback(null, log);

    });
};
