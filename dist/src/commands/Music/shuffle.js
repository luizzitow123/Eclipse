"use strict";
const Command = require("../../structures/Command");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "shuffle",
            description: "Embaralha a fila de música",
            description_en: "Shuffles the music queue",
            category: "Música",
            category_en: "Music",
            enabled: true
        });
    }
    async run(message, args, lang) {
        const player = this.client.manager.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if (!player) {
            return message.quote(lang.geral.nada);
        }
        if (!channel) {
            return message.quote(lang.geral.naoTa);
        }
        if (channel.id !== player.voiceChannel) {
            return message.quote(lang.geral.mesmo);
        }
        player.queue.shuffle();
        return message.quote(lang.shuffle.finish);
    }
};
