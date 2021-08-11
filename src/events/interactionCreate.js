const Event = require('../interfaces/Event')

module.exports = class extends Event {
  async run (interaction) {
    if (!interaction.isCommand()) return

    await interaction.deferReply()

    if (!interaction.guildId || !interaction.channelId) {
      return interaction.editReply('Hello. I like my privacy, and do not handle things in DMs. It appears this is a direct message. You should interact with me in your guild instead.')
    }

    if (!interaction.client.guilds.cache.get(interaction.guildId)) {
      return interaction.editReply('For interactions to work, you need to add me with the scope ```applications.commands```')
    }

    const serverPrefix = this.client.prefix

    interaction.author = interaction.user

    interaction.content = `${serverPrefix}${interaction.commandName} ${interaction.options.size > 0 ? interaction.options.map(i => i.value) : ''}`.trim()

    interaction.slash = true

    let response = false

    interaction.reply = async (c, o) => {
      if (!response) {
        response = true
        return interaction.editReply(c, o)
      } else {
        return this.client.channels.cache.get(interaction.channel.id).send(c, o)
      }
    }

    interaction.edit = async (c, o) => {
      if (!response) {
        response = true
        return interaction.editReply(c, o)
      } else {
        return this.client.channels.cache.get(interaction.channel.id).send(c, o)
      }
    }

    this.client.emit('messageCreate', interaction)
  }
}
