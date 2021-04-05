const Command = require("../../structures/Command")

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			aliases: ['bass', 'boost'],
            description: 'Adiciona grave na música',
            description_en: "Add bass to music",
            category: 'Filtros',
            category_en: "Filters",
            name: "bassboost",
            enabled: true,
		});
    }

    async run(message, args, lang) {

        let { channel } = message.member.voice;

        let player = this.client.music.players.get(message.guild.id)

        if(!player) { return message.channel.send(lang.bassboost.nada) }

        if(!player.options.voiceChannel === channel.id) { return message.channel.send(lang.bassboost.tocandoJa) }

        if(player.bassboost === false) {
            player.setBassboost(true)
            return message.channel.send(lang.bassboost.ativado)
        }

        if(player.bassboost === true) {
            player.setBassboost(false)
            return message.channel.send(lang.bassboost.desativado)
        }
    }
}