const Command = require("../../structures/command")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "pause",
            aliases: ['pausar'],
            description: "Pausa a música",
            description_en: "Pause the music",
            category: 'Música',
            category_en: "Music",
            enabled: true
        })
    }

    async run(message, args, lang) {
        const player = this.client.manager.players.get(message.guild.id)

        const { channel } = message.member.voice

        if (!player) {
            return message.quote(lang.geral.nada)
        }

        if (!channel) {
            return message.quote(lang.geral.naoTa)
        }

        if (channel.id !== player.voiceChannel) {
            return message.quote(lang.geral.mesmo)
        }

        if (player.paused) {
            return message.quote(lang.pause.pausadoJa)
        }

        player.pause()
        return message.quote(lang.pause.pausado)
    }
}