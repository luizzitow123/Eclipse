const config = require("../../config.json")
const {MessageEmbed} = require('discord.js') 
module.exports.run = async (bot, message, args, idioma) => {
	var embed = new MessageEmbed()
	embed.setColor(config.color)
	embed.setDescription(`Comandos no total: \`${bot.commands.size}\`\nCriado por: \`BONEE#1234\``)
	embed.setAuthor(`${bot.user.username}`, `${bot.user.avatarURL()}`)
	embed.setTimestamp()
	embed.setFooter(`${idioma.help.footer} | Eclipse ${config.versão}`);
	embed.addFields(
	{ name: `${idioma.help.outros} (${bot.commands.filter(command => command.help.categoria === "Outros").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Outros").map(e => `\`e.${e.help.nome}\``).join(", ")}` + '.', inline: false },
	{ name: `${idioma.help.música} (${bot.commands.filter(command => command.help.categoria === "Música").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Música").map(e => `\`e.${e.help.nome}\``).join(", ")}` + '.', inline: false },
	{ name: `${idioma.help.desenvolvedor} (${bot.commands.filter(command => command.help.categoria === "Desenvolvedor").size})`, value: `${bot.commands.filter(command => command.help.categoria === "Desenvolvedor").map(e => `\`e.${e.help.nome}\``).join(", ")}` + '.', inline: false }
	)
	message.channel.send({embed})
}
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliase: ["ajuda", "comandos", "cmds"]
}
exports.help = {
    nome: "help",
    descrição: "Mostra os comandos do bot",
    uso: "help [COMANDO]",
    categoria: "Outros"
}