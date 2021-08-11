const Command = require('../../interfaces/Command')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      aliases: [],
      description: 'Adiciona o filtro nightcore a música',
      description_en: 'Adds the nightcore filter to music',
      category: 'Filtros',
      category_en: 'Filters',
      name: 'nightcore',
      enabled: true
    })
  }

  async run (message, args, lang) {
    const { channel } = message.member.voice

    const player = this.client.manager.players.get(message.guild.id)

    if (!player) { return message.channel.send(lang.bassboost.nada) }

    if (!player.options.voiceChannel === channel.id) { return message.channel.send(lang.bassboost.tocandoJa) }

    if (player.nightcore === false) {
      player.setNightcore(true)
      return message.quote(lang.nightcore.ativado)
    }

    if (player.vaporwave === true) {
      player.setNightcore(false)
      return message.quote(lang.nightcore.desativado)
    }
  }
}
