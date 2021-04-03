const Command = require("../../structures/command")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "queue",
      aliases: ['fila'],
      description: "Mostra a fila de música",
      description_en: "Shows the music queue",
      category: "Música",
      category_en: "Music",
      enabled: true,
    })
  }
  async run(message, args, lang) {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.quote(lang.queue.nothing);
    
    let queue = player.queue;
    let embed = new MessageEmbed()
    embed.setAuthor(`${lang.queue.fila} ${message.guild.name}`);
    embed.setColor(message.guild.me.roles.highest.color)
    
    let multiple = 5;
    let page = args.length && Number(args[0]) ? Number(args[0]) : 1;
    
    let end = page * multiple;
    let start = end - multiple;
    
    let tracks = queue.slice(start, end);
    
    if (queue.current) embed.addField(lang.queue.np, `**[${queue.current.title}](${queue.current.uri})** (${queue.current.requester.tag}) \n↳ ${this.client.utils.time(queue.current.duration)}`);
    
    if (!tracks.length) embed.setDescription(`${lang.queue.nohasmusic} ${page > 1 ? `${lang.queue.arg1} ${page}` : lang.queue.arg2}.`);
    else embed.setDescription(tracks.map((track, i) => `\`.${start + (++i)}\` **[${track.title}](${track.uri})** (${track.requester.tag})\n↳ ${this.client.utils.time(track.duration)}`).join("\n"));
    
    let maxPages = Math.ceil(queue.length / multiple);
    
    embed.setFooter(`${lang.queue.arg1.replace(/^./, lang.queue.arg1[0].toUpperCase())} ${page > maxPages ? maxPages : page} ${lang.queue.arg3} ${maxPages}`);
    
    return message.quote(embed)
  }
}