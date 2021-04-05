"use strict";
const Event = require("../structures/Event");
module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }
    async run(r) {
        if (this.client.manager)
            this.client.manager.updateVoiceState(r);
    }
};
