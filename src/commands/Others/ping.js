const Command = require('../../interfaces/Command')
module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'ping',
      description: 'Shows the bot ping',
      category: 'Others',
      enabled: true
    })
  }

  async run (interaction, lang) {
    const a = await interaction.reply('🏓')
    await a.edit(`${lang.ping.pong} \`${this.client.ws.ping}ms\`. ${lang.ping.latency} \`${Date.now() - interaction.createdTimestamp}ms\`\n**Uptime:** ${this.client.utils.time(this.client.uptime)}`)
  }
}
