const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ajuda', 'commands'],
			name: "help",
			description: 'Mostra os comandos do bot',
			description_en: 'Shows bot commands',
			category: 'Outros',
			category_en: 'Others',
			usage: '[comando]',
			usage_en: '[command]',
			enabled: true
		});
	}

	async run(message, args, lang) {


		let check = this.client.db.get(message.guild.id) || 'pt'

		
		if (args[0]) {

			let cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));

			if (!cmd) { 
				return message.channel.send(lang.help.invalid)
			}

			let embed = new MessageEmbed()
			embed.setColor(message.guild.me.roles.highest.color)
		    embed.setTimestamp()
			embed.setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size:2048 }))
			embed.setDescription([
				`**• Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' **|** ') : lang.help.Aliases}`,
				`**• ${lang.help.description}:** ${check === 'en' ? cmd.description_en : cmd.description}`,
				`**• ${lang.help.category}:** ${check === 'en' ? cmd.category_en : cmd.category}`,
				`**• ${lang.help.usage}:** ${check === 'en' ? cmd.usage_en : cmd.usage}`
			])
			embed.setFooter(lang.help.footer)
			return message.channel.send(embed)

		} else {
			let embed1 = new MessageEmbed()
		    embed1.setColor(message.guild.me.roles.highest.color)
		    embed1.setTimestamp()
		    embed1.setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size:2048 }))
		    embed1.addFields(
			    { name: `${lang.help.outros} (${this.client.commands.filter(command => command.category === "Outros").size})`, value: `${this.client.commands.filter(command => command.category === "Outros").map(e => `\`${this.client.prefix}${e.name}\``).join(" **|** ")}` + '.' },
			    { name: `${lang.help.musica} (${this.client.commands.filter(command => command.category === "Música").size})`, value: `${this.client.commands.filter(command => command.category === "Música").map(e => `\`${this.client.prefix}${e.name}\``).join(" **|** ")}` + '.' },
			    { name: `${lang.help.filtros} (${this.client.commands.filter(command => command.category === "Filtros").size})`, value: `${this.client.commands.filter(command => command.category === "Filtros").map(e => `\`${this.client.prefix}${e.name}\``).join(" **|** ")}` + '.' },
			    { name: `${lang.help.dev} (${this.client.commands.filter(command => command.category === "Desenvolvedor").size})`, value: `${this.client.commands.filter(command => command.category === "Desenvolvedor").map(e => `\`${this.client.prefix}${e.name}\``).join(" **|** ")}` + '.' }
			)
			return message.quote(embed1)
		}
	}
}