const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const Event = require('./Event.js');
const logger = require("../core/logger")

class Util {
	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} mais...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}
	
	checkOwner(target) {
		return this.client.owners.includes(target);
	}

	isOwner(message) {
        return (this.client.config.owner.includes(message.author.id));
    }

	comparePerms(member, target) {
		return member.roles.highest.position < target.roles.highest.position;
	}

	formatPerms(perm) {
		return perm
	}


	formatArray(array, type = 'conjunction') {
		return new Intl.ListFormat('en-GB', { style: 'short', type: type }).format(array);
	}

	formatArray2(array, type = 'conjunction') {
		return new Intl.ListFormat('pt-BR', { style: 'short', type: type }).format(array);
	}
	// eslint-disable-next-line
	time2(s) {
		function pad(n, z) {
			z = z || 2;
			return ('00' + n).slice(-z);
		}
		var ms = s % 1000;
		s = (s - ms) / 1000;
		var secs = s % 60;
		s = (s - secs) / 60;
		var mins = s % 60;
		var hrs = (s - mins) / 60;
	
		var days = parseInt(Math.floor(hrs / 24));
		hrs = parseInt(hrs % 24);
		
		var meses = parseInt(Math.floor(days / 30));
		days = parseInt(days % 30);
		
		return (meses > 0 ? pad(meses) + 'm, ' : "") + (days > 0 ? pad(days) + 'd, ' : "") + (hrs > 0 ? pad(hrs) + 'h, ' : "") + (mins > 0 ? pad(mins) + 'm ' : "") + (pad(secs) + 's' )
	}
	
	time(s) {
		function pad(n, z) {
			z = z || 2;
			return ('00' + n).slice(-z);
		}
		var ms = s % 1000;
		s = (s - ms) / 1000;
		var secs = s % 60;
		s = (s - secs) / 60;
		var mins = s % 60;
		var hrs = (s - mins) / 60;
	
		var days = parseInt(Math.floor(hrs / 24));
		hrs = parseInt(hrs % 24);
		
		var meses = parseInt(Math.floor(days / 30));
		days = parseInt(days % 30);
		
		return (meses > 0 ? pad(meses) + 'm, ' : "") + (days > 0 ? pad(days) + 'd, ' : "") + (hrs > 0 ? pad(hrs) + 'h, ' : "") + (mins > 0 ? pad(mins) + 'm ' : "") + (pad(secs) + 's')
	}

	async loadCommands() {
        logger.info("Comandos carregados")
        return glob(`${this.directory}commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof Command)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }

	async loadEvents() {
		logger.info("Eventos carregados")
		return glob(`${this.directory}events/*.js`).then(events => {
			for (const eventFile of events) {
				delete require.cache[eventFile];
				const { name } = path.parse(eventFile);
				const File = require(eventFile);
				if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
				const event = new File(this.client, name);
				if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
				this.client.events.set(event.name, event);
				event.emitter[event.type](name, (...args) => event.run(...args));
			}
		});
	}
}

module.exports = Util