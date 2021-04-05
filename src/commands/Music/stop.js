const Command = require("../../structures/Command")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "stop",
            aliases: ['parar'],
            category: 'Música',
            category_en: "Music",
            description: "Para de tocar as músicas",
            description_en: "Stop playing the songs",
            enabled: true
        })
    }

    async run(message, args, lang) {
        const player = this.client.manager.players.get(message.guild.id)

        if(!player) return message.quote(lang.stop.nada)

        const { channel } = message.member.voice
    
        if(!channel) return message.quote(lang.stop.conectar);
        if (channel.id !== player.voiceChannel) return message.quote(lang.stop.conectar2);
    
        player.destroy();
        return message.quote(lang.stop.parou);
    }
}