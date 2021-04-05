"use strict";
const { Permissions } = require('discord.js');
module.exports = class Command {
    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || 'Sem descrição';
        this.description_en = options.description_en || 'Without description';
        this.category = options.category || 'Outros';
        this.category_en = options.category_en || options.category;
        this.usage = `${this.client.prefix}${this.name} ${options.usage || ''}`.trim();
        this.usage_en = `${this.client.prefix}${this.name} ${options.usage_en || ''}`.trim();
        this.userPerms = new Permissions(options.userPerms).freeze();
        this.botPerms = new Permissions(options.botPerms).freeze();
        this.enabled = options.enabled || false;
        this.ownerOnly = options.ownerOnly || false;
        this.args = options.args || false;
    }
    // eslint-disable-next-line no-unused-vars
    async run(message, args, lang) {
        throw new Error(`Command ${this.name} doesn't provide a run method!`);
    }
};
