const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            name: "lang",
			aliases: ['set-lang', 'idioma'],
            description: 'Muda o idioma do bot',
            description_en: 'Change the bot language',
            category: 'Outros',
            category_en: 'Others',
            enabled: true,
            userPerms: ['MANAGE_GUILD']
		});
    }

    async run(message) {

        let idioma = this.client.db.get(message.guild.id)

        if(idioma === 'en') {
            this.client.db.delete(message.guild.id)
            message.quote("Falarei português neste servidor")
        }

        if(!idioma) {
            this.client.db.set(message.guild.id, 'en')
            message.quote("I will speak English on this server")
        }
    }
}