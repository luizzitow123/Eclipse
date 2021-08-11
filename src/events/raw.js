/* eslint-disable no-useless-constructor */
const Event = require('../interfaces/Event')

module.exports = class extends Event {
  constructor (...args) {
    super(...args)
  }

  async run (r) {
    if (this.client.manager) this.client.manager.updateVoiceState(r)
  }
}
