'use strict';

var ElasticalBackend = require('../backends/elasticalBackend');
var queries = require('./queries');

var LumberjackStorage = {};
exports = module.exports = LumberjackStorage;

var INDEX = 'logs';
var TYPE = 'elasticsearch';

LumberjackStorage.getLogByIdAndUser = function (user, ids, callback) {
    var qryObj = queries.getByUserAndId(user, ids);
    ElasticalBackend.getLog(qryObj, INDEX, TYPE, callback);
};
