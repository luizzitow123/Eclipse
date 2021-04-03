const Command = require("../../structures/command")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'volume',
            aliases: ['vol'],
            category: "Música",
            category_en: "Music",
            description: "Aumenta ou diminui o volume da música",
            description_en: "Increase or increase the volume of the music",
            enabled: true,
        })
    }

    async run(message, args, lang) {
        const player = this.client.manager.players.get(message.guild.id)

        if (!player) return message.quote(lang.volume.nada);

        const { channel } = message.member.voice;
    
        if (!channel) return message.quote(lang.volume.conectar);

        if (channel.id !== player.voiceChannel) return message.quote(lang.volume.conectar2);

        if (!args.length) return message.quote(lang.volume.setadoJa + '`' + player.volume + '`')


        const volume = Number(args[0]);

        if (!volume || volume < 1 || volume > 100) return message.quote(lang.volume.invalido);

        player.setVolume(volume);
        return message.quote(lang.volume.mudado + player.volume)
    }
}