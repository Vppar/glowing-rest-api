(function () {
    'use strict';

    ElasticSearchClient = require('elasticsearchclient');
    var config = require('../config');
    
    var serverOptions = {
        host : config.ELASTICSEARCH_DOMAIN,
        port : config.ELASTICSEARCH_PORT,
        pathPrefix : 'optional pathPrefix',
        secure : true || false,
    // Optional basic HTTP Auth
    /*
     * auth: { username: process.env.ES_USERNAME, password:
     * process.env.ES_PASSWORD }
     */
    };

    var elasticSearchClient = new ElasticSearchClient(serverOptions);

    var ElasticalBeckend = {};

    exports = module.exports = ElasticalBeckend;

    function getLog (qryObj, callback) {
        // call elastic

        elasticSearchClient.search('logs', 'elasticsearch', qryObj).on(
            'data',
            function (data) {
                console.log(JSON.parse(data));
                callback(null, data);
            }).on('done', function () {
            // always returns 0 right now
        }).on('error', function (error) {
            callback(error, null);
            console.log(error);
        }).exec();

    }

    ElasticalBeckend.getLog = function (qryObj, callback) {
        setTimeout(function () {
            callback(null, getLog(qryObj, callback));
        }, 0);
    };

    ElasticalBeckend.get = function (bucketName, id, callback) {
        var bucket = getBucket(bucketName);
        var data = bucket && bucket[id] || null;

        setTimeout(function () {
            callback(null, data);
        }, 0);
    };

    ElasticalBeckend.insert = function (bucketName, data, callback) {
        var bucket = ensureBucket(bucketName);

        setTimeout(function () {
            if (!data.id) {
                data.id = MemmoryBackend.createId(bucketName);
            }

            bucket[data.id] = data;
            console.log('Data inserted in', bucketName, 'bucket:', data);

            if (callback) {
                callback(null, data.id, data);
            }
        }, 0);
    };

    ElasticalBeckend.update = function (bucketName, id, update, callback) {
        MemmoryBackend.get(bucketName, id, function (err, data) {
            if (data) {
                _.extend(data, update);
                if (callback) {
                    callback(null, data);
                }
            } else {
                if (callback) {
                    callback(null, null);
                }
            }
        });
    };

    MemmoryBackend.remove = function (bucketName, id, callback) {
        var bucket = getBucket(bucketName);

        setTimeout(function () {
            if (bucket) {
                delete bucket[id];
            }

            callback(null, null);
        }, 0);
    };

})();
