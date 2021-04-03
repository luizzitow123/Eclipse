const Event = require('../structures/Event');

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