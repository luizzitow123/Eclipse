const { Client, Collection, Permissions } = require('discord.js');
const Util = require('../structures/Utils.js');
const Intents = require('./managers/intentsManager');
const DatabaseManager = require('denky-json-database');
const settings = require('../structures/Settings');
const pkg = require('../../package.json');

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

        this.db = new DatabaseManager('./data/db.json');

    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Opção para obejeto');

        this.token = options.bot.token;

        this.prefix = options.bot.prefix;

        this.defaultPerms = new Permissions(["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT", "SPEAK"]).freeze();

    }
    async start(token = this.token) {

        this.utils.loadCommands()
        this.utils.loadEvents()
        await super.login(token);
    }
}

module.exports = Eclipse;