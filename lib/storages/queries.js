/**
 * Configures the REST API.
 */

/**
 * Configuration object.
 * 
 * @enum
 */
var queries = {};

/** Expose config */
exports = module.exports = queries;

queries.getByUserAndId = function (user, id) {
    return {
        "query" : {
            "filtered" : {
                "query" : {
                    "queryString" : {
                        "fields" : [
                            "@fields.user"
                        ],
                        "query" : user
                    }
                },
                "filter" : {
                    "bool" : {
                        "must" : {
                            "term" : {
                                "id" : id
                            }
                        }
                    }
                }
            }
        }
    }
};