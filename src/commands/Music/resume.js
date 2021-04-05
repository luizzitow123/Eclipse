const Command = require("../../structures/Command")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "resume",
            aliases: ["despausar"],
            description: "Despausa a música",
            description_en: "Resume the music",
            category: "Música",
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
            return message.quote(lang.resume.resumeJa)
        }

        player.pause()
        return message.quote(lang.pause.resumido)
    }
}