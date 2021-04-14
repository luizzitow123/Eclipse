const mongoose = require('mongoose')
const logger = require('../core/logger')

class Mongo {
    constructor(config) {
        mongoose.connect(config.database.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        logger.info("Connected to the database");
        return true;
    }
}

module.exports = Mongo;