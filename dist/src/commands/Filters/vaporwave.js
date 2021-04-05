"use strict";
const Command = require("../../structures/Command");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Adiciona o filtro vaporwave a música',
            description_en: "Adds the vaporwave filter to music",
            category: 'Filtros',
            category_en: "Filters",
            name: "vaporwave",
            enabled: true,
        });
    }
    async run(message, args, lang) {
        let { channel } = message.member.voice;
        let player = this.client.music.players.get(message.guild.id);
        if (!player) {
            return message.channel.send(lang.bassboost.nada);
        }
        if (!player.options.voiceChannel === channel.id) {
            return message.channel.send(lang.bassboost.tocandoJa);
        }
        if (player.vaporwave === false) {
            player.setVaporwave(true);
            return message.quote(lang.vaporwave.ativado);
        }
        if (player.vaporwave === true) {
            player.setVaporwave(false);
            return message.quote(lang.vaporwave.desativado);
        }
    }
};
