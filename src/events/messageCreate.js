const Event = require('../interfaces/Event')

module.exports = class extends Event {
  async run (message) {
    let lang = this.client.db.get(message.guild.id) || 'en'

    const checks = this.client.db.get(message.guild.id) || 'en'

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

    const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`)
    const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `)

    if (message.author.bot) return

    if (message.content.match(mentionRegex)) message.reply(`${lang.message.prefixo} \`${this.client.prefix}\`.`)

    const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.client.prefix.toLowerCase()

    if (!message.content.startsWith(prefix)) return

    if (!message.guild) return

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)

    const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase())) || await this.client.application?.commands.create(cmd.toLowerCase())
    if (command) {
      if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
        return message.reply(lang.message.dono)
      }

      if (!command.enabled) {
        return message.reply(lang.message.desabilitado)
      }

      if (command.nsfw && !message.channel.nsfw) {
        return message.reply(lang.message.nsfw)
      }

      if (command.args && !args.length) {
        return message.reply(`${lang.message.args} ${checks === 'pt' ? command.usage_en : command.usage}`)
      }

      if (message.guild) {
        const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms
        if (userPermCheck && !this.client.utils.checkOwner(message.author.id)) {
          const missing = message.channel.permissionsFor(message.member).missing(userPermCheck)
          if (missing.length) {
            return message.reply(`${lang.message.userPerms} \`${checks === 'pt' ? this.client.utils.formatArray(missing.map(this.client.utils.formatPerms)) : this.client.utils.formatArray2(missing.map(this.client.utils.formatPerms))}\` ${lang.message.userPerms2}`)
          }
        }

        const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms
        if (botPermCheck) {
          const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck)
          if (missing.length) {
            return message.reply(`${lang.message.botPerm} \`${checks === 'pt' ? this.client.utils.formatArray(missing.map(this.client.utils.formatPerms)) : this.client.utils.formatArray2(missing.map(this.client.utils.formatPerms))}\` ${lang.message.botPerm2}`)
          }
        }
      }
      command.run(message, args, lang)
    }
  }
}
