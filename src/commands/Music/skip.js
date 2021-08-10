const Command = require("../../structures/Command")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'skip',
            aliases: ['pular'],
            category: "Música",
            category_en: 'Músic',
            description: "Pula uma música",
            description_en: "Skip a song",
            enabled: true
        });
    }

    async run(message, args, lang) {
        const player = this.client.manager.players.get(message.guild.id)

        const { channel } = message.member.voice

        if(!player) return message.quote(lang.skip.nada)

    
        if(!channel) return message.quote(lang.skip.conectar);
        if(channel.id !== player.voiceChannel) return message.quote(lang.skip.conectar2);
    
        return player.stop();
    }
}