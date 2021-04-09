const { Client, Collection, Permissions } = require('discord.js')
const Util = require('../structures/Utils.js')
const config = require('../../config/config.json')
const Intents = require('./managers/intentsManager')
const DatabaseManager = require('denky-json-database')
const settings = require('../structures/Settings')
const pkg = require('../../package.json')
const Mongo = require('../database/database')

const Database = new Mongo(config)

class Eclipse
    extends Client {
    constructor(options) {
        super({
            disableEveryone: true,
            messageCacheMaxSize: 200,
            restTimeOffset: 1,
            ws: {
                intents: Intents(),
              },
        });

        this.validate(options);

        this.settings = settings;

        this.commands = new Collection();

        this.aliases = new Collection();

        this.events = new Collection();

        this.utils = new Util(this);

        this.lang = {}
        
        this.version = pkg.version;

        this.owners = options.owners,

        this.config = config;

        this.database = Database;

        this.db = new DatabaseManager('./data/db.json');

    }

    validate(options) {

        this.token = options.bot.token;

        this.prefix = options.bot.prefix;

        this.defaultPerms = new Permissions(["SEND_MESSAGES", "READ_MESSAGE_HISTORY"]).freeze();

    }
    async start(token = this.token) {

        this.utils.loadCommands()
        this.utils.loadEvents()
        await super.login(token);
    }
}

module.exports = Eclipse;
