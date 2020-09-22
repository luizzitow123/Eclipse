const config = require("../config.json");
const { bot } = require("../index");

bot.on("message", async message => {
    if(message.author.bot) return;
    let prefix;
    if(!message.guild) prefix = "e."
    if(message.guild) prefix = config.prefix
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(' ').join(' ').split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(!commandfile) commandfile = bot.aliases.get(cmd.slice(prefix.length))
    if(!commandfile.conf.enabled) return message.channel.send('❌ Comando desativado')
    if(!message.guild&&commandfile.conf.guildOnly) return message.channel.send("Você não pode usar comandos na DM do bot").catch(e => bot.channels.cache.get("746448706772926554").send(e))
    if(commandfile) commandfile.run(bot,message,args);
})