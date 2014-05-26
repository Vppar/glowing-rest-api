(function () {
    'use strict';

    var ElasticSearchClient = require('elasticsearchclient');
    var config = require('../config');

    var serverOptions = {
        host : config.ELASTICSEARCH_DOMAIN,
        port : config.ELASTICSEARCH_PORT,
    // Optional basic HTTP Auth
    //
    // auth: { username: process.env.ES_USERNAME, password:
    // process.env.ES_PASSWORD }
    //
    };

    var elasticSearchClient = new ElasticSearchClient(serverOptions);

    var ElasticalBeckend = {};

    exports = module.exports = ElasticalBeckend;

    ElasticalBeckend.getLog = function (qryObj, index, type, callback) {
        // call elastic
        elasticSearchClient.search(index, type, qryObj).on('data', function (data) {
            var result = JSON.parse(data);
            if (result.hits && result.hits.total > 0) {
                callback(null, result.hits.hits);
            } else {
                callback(null, null);
            }
        }).on('error', function (error) {
            callback(error, null);
        }).exec();
    };

})();
