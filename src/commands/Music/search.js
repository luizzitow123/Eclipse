/* eslint-disable no-case-declarations */
const Command = require('../../structures/Command');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            name: "search",
            aliases: ['pesquisar'],
            usage: "<nome da música>",
            usage_en: "<music name>",
            description: "Pesquisa uma música e a coloca para tocar",
            description_en: "Search for a song and put it to play",
            category: "Música",
            category_en: "Music",
            enabled: true,
            botPerms: ['CONNECT', 'SPEAK']
		});
    }
    async run(message, args, lang) {

        let play = message.client.manager.players.get(message.guild.id)

        const { channel } = message.member.voice;

        if(!channel) return message.reply(lang.search.semCanal);

        if(!play) {
            const player = message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            })
			if (!channel.joinable) { return message.quote(lang.search.semPerm) }
            player.connect();
        }

        const player = message.client.music.players.get(message.guild.id)

        if(!player.options.voiceChannel === channel.id) { return message.quote(lang.search.tocandoJa) }

        const search = args.join(' ');
        let res;

        try {
            res = await player.search(search, message.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw new Error(res.exception.message);
            }
        } catch(err) {
            return message.quote(`${lang.search.erro}: ${err.message}`);
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                return message.quote(lang.search.semResultado);

            case 'PLAYLIST_LOADED':
                message.quote(lang.search.semLink)
                return player.destroy()

            case 'TRACK_LOADED':
                message.quote(lang.search.semLink)
                return player.destroy()    

        case 'SEARCH_RESULT':
            let max = 10, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|cancelar)$/i.test(m.content) || message.author.id && /^(\d+|cancel)$/i.test(m.content);
            if (res.tracks.length < max) max = res.tracks.length;

            const results = res.tracks
            .slice(0, max)
            .map((track, index) => `\`${++index}.\` **[${track.title}](${track.uri})**\n↳ ${lang.search.por} ${track.author}`)
            .join('\n');

            let embed3 = new MessageEmbed()
            embed3.setColor(message.guild.me.roles.highest.color)
            embed3.setTimestamp()
            embed3.setDescription(`${results}\n \n<:yep:785737562819526666> ${lang.search.numero} \`cancelar\``)
            embed3.setFooter(`Copyright © 2020 - 2021 Hiekki Studio - v${this.client.version}`)
            message.quote(embed3);

            try {
                collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
            } catch(e) {
                if (!player.queue.current) player.destroy();
                return message.quote(lang.search.tempo);
            }

            const first = collected.first().content;

            if (first.toLowerCase() === 'cancelar' || first.toLowerCase() === 'cancel') {
                if (!player.queue.current) player.destroy();
                return message.quote(lang.search.cancel);
            }

            let index = Number(first) - 1;
            if (index < 0 || index > max - 1) index = 0

            const track = res.tracks[index];
            await player.queue.add(track);

            let embed4 = new MessageEmbed()
            embed4.setColor(message.guild.me.roles.highest.color)
            embed4.setFooter(`Copyright © 2020 - 2021 Hiekki Studio - v${this.client.version}`)
            embed4.setFooter(`${lang.search.solicitado} ${track.requester.tag}`, `${track.requester.displayAvatarURL({ dynamic: true, size: 2048 })}`)
            embed4.setDescription(`**${lang.search.fila}** \`${track.title}\` **${lang.search.fila2}** \n**${lang.search.duracao}:** \`${this.client.utils.time(track.duration)}\``)
            if(!player.playing && !player.paused && !player.queue.length) player.play();
            return message.quote(embed4);
        }
    }
}