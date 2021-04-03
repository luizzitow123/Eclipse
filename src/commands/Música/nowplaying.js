const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const { porgressBar } = require("music-progress-bar");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "nowplaying",
            aliases: ['np'],
            description: "Mostra a música que esta tocando no momento",
            description_en: "Shows the song currently playing",
            category: "Música",
            category_en: "Music",
            enabled: true,
        })
    }

    async run(message, args, lang) {

        const player = message.client.manager.players.get(message.guild.id);


        if(!player) return message.quote(lang.np.nada)

        const { title, duration } = player.queue.current;

        let progressBar = porgressBar({ currentPositon: player.position > 0 ? player.position : "1", endPositon: duration, width: 10, barStyle: "▬", currentStyle: player.playing ? "<:bolinha:771832602591232040>" : "<:bolinha:771832602591232040>"  }, { format:" [ <bar> ] " })

        let embed = new MessageEmbed()
        embed.setTimestamp()
        embed.setAuthor("NowPlaying", message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        embed.setColor(message.guild.me.roles.highest.color)
        embed.setDescription(`${player.playing ? "" : ""} ${title}\n${progressBar} \`${player.position <= 60000 ? `${this.client.utils.time(player.position)}` : this.client.utils.time(player.position)} / ${this.client.utils.time(duration)}\``);
        return message.quote(embed)
    }
}