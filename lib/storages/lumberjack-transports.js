/*******************************************************************************
 * Transports config
 ******************************************************************************/

var elastical = require('elastical');
var config = require('../config');

var transports = {};

/** Expose config */
exports = module.exports = transports;


// **************
// Loggly
// **************
transports.logglyConf = {
    inputToken : config.loggly.inputToken,
    subdomain : config.loggly.subdomain,
    json : true,
    level : config.DEFAULT_LEVEL
};
// **********************
// ElasticSearch
// **********************
transports.elasticSearchConf = {
    level : config.DEFAULT_LEVEL,
    client : new elastical.Client(config.elasticsearch.domain, {
        port : config.elasticsearch.port
    }),
    disable_fields : true
};

// ****************
// Console
// ****************
transports.consoleConf = {
    colorize : true,
    level : config.DEFAULT_LEVEL
};
