
/**
 * Configures the REST API.
 */


/**
 * Configuration object.
 * @enum
 */
var config = {};


/** Expose config */
exports = module.exports = config;


config.TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60; // 7 days to seconds


config.SSL_CERTIFICATE = null;
config.SSL_KEY = null;
