const Command = require('../../interfaces/Command')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'eval',
      aliases: ['ev', 'e'],
      description: {
        pt: 'Roda codigos',
        en: 'Run codes'
      },
      usage: {
        pt: '<codigo>',
        en: '<code>'
      },
      category: 'Developer',
      enabled: true,
      ownerOnly: true,
      args: true
    })
  }

  async run (message, args) {
    try {
      // eslint-disable-next-line no-eval
      let code = await eval(args.join(' '))
      if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 })
      message.reply(`📩 Input \`\`\`js\n${args.join(' ')}\`\`\`\n🚩 Exit \`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
    } catch (err) {
      message.reply(`\`\`\`js\n${err}\n\`\`\``)
    }
  }
}
