const Event = require('../interfaces/Event')

module.exports = class extends Event {
  async run (interaction) {
    if (!interaction.isCommand()) return

    await interaction.deferReply()

    if (!this.client.commands.has(interaction.commandName)) return

    let lang = this.client.db.get(interaction.guild.id) || 'en'

    const checks = this.client.db.get(interaction.guild.id) || 'pt'

    const ptbr = JSON.parse(JSON.stringify(this.client.lang.pt))
    const enus = JSON.parse(JSON.stringify(this.client.lang.en))

    switch (lang.toLowerCase()) {
      case 'pt':
        lang = ptbr
        break
      case 'en':
        lang = enus
        break
      default:
        lang = enus
        break
    }

    if (!interaction.guild) {
      return interaction.editReply(lang.interaction.dm)
    }

    const command = this.client.commands.get(interaction.commandName)

    if (command.ownerOnly && !this.client.utils.checkOwner(interaction.user.id)) {
      return interaction.editReply(lang.message.dono)
    }

    if (!command.enabled) {
      return interaction.editReply(lang.message.desabilitado)
    }

    if (command.nsfw && !interaction.channel.nsfw) {
      return interaction.editReply(lang.message.nsfw)
    }

    const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms
    if (userPermCheck && !this.client.utils.checkOwner(interaction.user.id)) {
      const missing = interaction.channel.permissionsFor(interaction.member).missing(userPermCheck)
      if (missing.length) {
        return interaction.editReply(`${lang.message.userPerms} \`${checks === 'en' ? this.client.utils.formatArray(missing.map(this.client.utils.formatPerms)) : this.client.utils.formatArray2(missing.map(this.client.utils.formatPerms))}\` ${lang.message.userPerms2}`)
      }
    }

    const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms
    if (botPermCheck) {
      const missing = interaction.channel.permissionsFor(this.client.user).missing(botPermCheck)
      if (missing.length) {
        return interaction.editReply(`${lang.message.botPerm} \`${checks === 'en' ? this.client.utils.formatArray(missing.map(this.client.utils.formatPerms)) : this.client.utils.formatArray2(missing.map(this.client.utils.formatPerms))}\` ${lang.message.botPerm2}`)
      }
    }

    let response = false

    interaction.author = interaction.user

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

    try {
      await command.run(interaction, lang)
    } catch (error) {
      console.error(error)
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
  }
}
