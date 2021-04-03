const { Database } = require("quickmongo");
const config = require("../../config/config.json")
const database = new Database(config.database.mongo.link);
const logger = require("./logger")

database.on("ready", () => {
    logger.info("Database conectada");
});

module.exports = database;