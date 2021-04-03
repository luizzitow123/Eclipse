const Event = require('../structures/Event');
const LavalinkManager = require("../core/player/lavalinkManager")
const logger = require("../core/logger")

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {

		setInterval(() => {
			this.client.users.cache.sweep(u => u)
		}, 6000)

		LavalinkManager(this.client);
		this.client.manager.init(this.client.user.id);

		logger.info(`O ${this.client.user.username} foi iniciado`)

		setInterval(() => {
			this.client.user.setActivity(`${this.client.prefix}help | Uptime ${this.client.utils.time(this.client.uptime)}`), { type: 5 }
		}, 60000)
	}
}