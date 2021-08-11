const moment = require('moment')
const chalk = require('chalk')

class Logger {
  constructor () {
    this.info = (msg) => {
      const time = moment().format('HH:mm:ss')
      if (!msg) return
      const format = `${chalk.gray(`[${time}]`)} ${chalk.blueBright('INFO')} ${msg}`
      console.log(format)
    }
    this.error = (level, error) => {
      let severity = null

      if (level === 0) {
        severity = 'DEBUG'
      } else if (level === 1) {
        severity = 'INFO'
      } else if (level === 2) {
        severity = 'WARNING'
      } else if (level === 3) {
        severity = 'ALERT'
      } else if (level === 4) {
        severity = 'ERROR'
      } else if (level === 5) {
        severity = 'EMERGENCY'
      } else {
        severity = 'UNKNOWN'
      }

      const time = moment().format('HH:mm:ss')
      const format = `${chalk.gray(`[${time}]`)} ${chalk.redBright(`${severity}`)} ${error}`

      console.error(format)

      return error
    }
  }
}

module.exports = new Logger()
