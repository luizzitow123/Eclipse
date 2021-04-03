const { Client, Collection, Permissions } = require('discord.js');
const Util = require('../structures/utils.js');
const Intents = require('./managers/intentsManager');
const DatabaseManager = require('denky-json-database');
const settings = require('../structures/settings');
const pkg = require('../../package.json');
const Mongo = require('../modules/mongo')
const database = new Mongo()
require('../website/dashboard')
class Eclipse
    extends Client {
    constructor(options) {
        super({
            disableEveryone: true,
            firstShardID: options.firstShardId || options.shardId || 0,
            lastShardID: options.lastShardId || options.shardId || 0,
            maxShards: options.shardCount || 1,
            ws: {
                intents: Intents(),
              },
            defaultImageFormat: 'png',
        });

        this.validate(options);

        this.settings = settings;

        this.commands = new Collection();

        this.aliases = new Collection();

        this.events = new Collection();

        this.utils = new Util(this);

        this.lang = {}
        
        this.version = pkg.version;

        this.owners = process.env.APP_OWNERS

        this.database = database;

        this.db = new DatabaseManager('./data/db.json');

    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Opção para obejeto');

        this.token = process.env.APP_TOKEN;

        this.prefix = process.env.APP_PREFIX;

        this.defaultPerms = new Permissions(["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT", "SPEAK"]).freeze();

    }
    async start(token = this.token) {

        this.utils.loadCommands()
        this.utils.loadEvents()
        await super.login(token);
    }
}

module.exports = Eclipse;