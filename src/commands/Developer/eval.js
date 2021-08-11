const Command = require('../../interfaces/Command')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      aliases: ['ev', 'e'],
      description: 'Roda codigos',
      category: 'Desenvolvedor',
      category_en: 'Developer',
      ownerOnly: true,
      args: true,
      name: 'eval',
      usage: '<codigo>',
      usage_en: '<code>',
      guildOnly: false,
      enabled: true
    })
  }

  async run (message, args) {
    try {
      // eslint-disable-next-line no-eval
      let code = await eval(args.join(' '))
      if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 })
      message.channel.send(`📩 Entrada \`\`\`js\n${args.join(' ')}\`\`\`\n🚩 Saída \`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
    } catch (err) {
      message.channel.send(`\`\`\`js\n${err}\n\`\`\``)
    }
  }
}
