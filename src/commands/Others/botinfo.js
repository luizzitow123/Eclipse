const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            name: "botinfo",
			aliases: ['info-bot', 'bot-info'],
            description: 'Mostra as informaçoes do bot',
            description_en: 'Displays bot information',
            category: 'Outros',
            category_en: 'Others',
            enabled: true,
		});
    }

    async run(message, args, lang) {
        let servidores = await this.client.shard.fetchClientValues('guilds.cache.size')
        let total_servers = servidores.reduce((prev, val) => prev + val)
        let embed = new MessageEmbed()
        embed.setColor(message.guild.me.roles.highest.color)
        embed.setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size: 2048 }))
        embed.setFooter(`Copyright © 2020 - 2021 Hiekki Studio`)
        embed.setDescription(`**[${lang.botinfo.suporte}](https://discord.gg/zTpXyK7CDH) | [${lang.botinfo.convide}](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=3492864&scope=bot) | [GitHub](https://github.com/hiekkistudio/eclipse)**`)
        embed.addFields(
            { name: lang.botinfo.servidores, value: `**${total_servers}** ${lang.botinfo.servidores}`, inline: true },
            { name: "Uptime", value: `**${this.client.utils.time(this.client.uptime)}**`, inline: true },
            { name: lang.botinfo.tocandoEm, value: `**${this.client.music.players.size}** ${lang.botinfo.servidores}`, inline: true },
            { name: "Ping", value: `**${Math.round(this.client.ws.ping)}**ms`, inline: true },
            { name: lang.botinfo.memoria, value: `**${this.client.utils.formatBytes(process.memoryUsage().rss)}**`, inline: true },
            { name: lang.botinfo.version, value: this.client.version, inline: true },
            { name: "Shards", value: `**${this.client.shard ? this.client.shard.count : '1'}**`, inline: true },
        )
        embed.setTimestamp()
        return message.quote(embed)
    }
}