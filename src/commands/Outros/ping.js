const Command = require("../../structures/Command")

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			aliases: [],
			name: "ping",
			description: 'Mostra o ping do bot',
			description_en: 'Shows the bot ping',
			category: 'Outros',
			category_en: 'Others',
			enabled: true
		});
    }

    async run(message, args, lang) {
        let a = await message.quote("🏓")
        await a.edit(`${lang.ping.pong} \`${this.client.ws.ping}ms\`. ${lang.ping.latency} \`${Date.now() - message.createdTimestamp}ms\`\n**Uptime:** ${this.client.utils.time(this.client.uptime)}`)
    }
}