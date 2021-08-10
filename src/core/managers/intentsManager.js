const { Intents } = require('discord.js')

module.exports = function intents() { 
const EcliseIntents = new Intents(Intents.ALL);

EcliseIntents.remove(Intents.PRIVILEGED);

}