const Command = require('../../structures/Command');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			args: true,
            name: "play",
            aliases: ['tocar'],
            usage: "<nome da música | link | link da playlist>",
            usage_en: "<song name | link | playlist link>",
            description: "Coloca uma música para tocar",
            description_en: "Put a song to play",
            category: "Música",
            category_en: "Music",
            enabled: true,
            botPerms: ['CONNECT', 'SPEAK']
		});
    }

    async run(message, args, lang) {

        let play = message.client.manager.players.get(message.guild.id)

        const { channel } = message.member.voice;

        if(!channel) return message.reply(lang.play.semCanal);

        if(!play) {
            const player = message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true
            })
            if(!channel.joinable) { return message.quote(lang.play.semPerm) }
            player.connect();
        }

        const player = message.client.manager.players.get(message.guild.id)

        if (!player.voiceChannel === channel.id) { return message.quote(lang.play.tocandoJa) }

        const search = args.join(' ');
        let res;

        try {
            res = await player.search(search, message.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw new Error(res.exception.message);
            }
        } catch(err) {
            return message.quote(`${lang.play.erro}: ${err.message}`);
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                return message.quote(lang.play.semResultado);

            case 'TRACK_LOADED':
                player.queue.add(res.tracks[0]);
                if (!player.playing && !player.paused && !player.queue.size) player.play();
                let embed = new MessageEmbed()
                embed.setTimestamp()
                embed.setColor(message.guild.me.roles.highest.color)
                embed.setDescription(`**${lang.play.musgaAdd}** \`${res.tracks[0].title}\`\n**${lang.play.duracao}:** \`${this.client.utils.time(res.tracks[0].duration)}\``)
                embed.setFooter(`${lang.play.solicitado} ${res.tracks[0].requester.tag}`, `${res.tracks[0].requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
                message.quote(embed)
                return

            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                let embed2 = new MessageEmbed()
                embed2.setTimestamp()
                embed2.setColor(message.guild.me.roles.highest.color)
                embed2.setDescription(`**${lang.play.playlist}** \`${res.playlist.name}\` **${lang.play.com}** \`${res.tracks.length}\` **${lang.play.musicas}**\n**${lang.play.duracao}:** \`${this.client.utils.time(res.playlist.duration)}\``)
                embed2.setFooter(`${lang.play.solicitado} ${res.tracks[0].requester.tag}`, `${res.tracks[0].requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
                return message.quote(embed2);


            case 'SEARCH_RESULT':
                await player.queue.add(res.tracks[0]);
                if(!player.playing && !player.paused && !player.queue.length) player.play();
                let embed4 = new MessageEmbed()
                embed4.setColor(message.guild.me.roles.highest.color)
                embed4.setFooter(`${lang.play.solicitado} ${res.tracks[0].requester.tag}`, `${res.tracks[0].requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
                embed4.setDescription(`**${lang.play.fila}** \`${res.tracks[0].title}\` **${lang.play.fila2}** \n**${lang.play.duracao}:** \`${this.client.utils.time(res.tracks[0].duration)}\``)
                message.quote(embed)
                return;
        }
    }
}