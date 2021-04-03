const Event = require('../structures/event');

module.exports = class extends Event {

    constructor(...args) {
		super(...args, {
			once: false
		});
	}

    async run(guild) {

        if(guild.region !== "brazil") {
        this.client.db.set(guild.id, 'en')
        }
    }
}