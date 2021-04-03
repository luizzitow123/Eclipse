const nodeMajorVersion = parseInt(process.versions.node.split('.')[0], 10); // eslint-disable-line
if (nodeMajorVersion < 14) {
  console.error('Unsupported NodeJS version! Please install NodeJS 8 or newer.');
  process.exit(1); // eslint-disable-line
}

const fs = require('fs');
const path = require('path');

try {
  fs.accessSync(path.join(__dirname, '..', 'node_modules')); // eslint-disable-line
} catch (e) {
  console.error('Please run "npm install" before starting the bot');
  process.exit(1); // eslint-disable-line
}

let testedPackage = '';
try {
  const packageJson = require('../package.json');
  const modules = Object.keys(packageJson.dependencies);
  modules.forEach(mod => {
    testedPackage = mod;
    fs.accessSync(path.join(__dirname, '..', 'node_modules', mod)) // eslint-disable-line
  });
} catch (e) {
  console.error(`Please run "npm install" again! Package "${testedPackage}" is missing.`);
  process.exit(1); // eslint-disable-line
}
const { ShardingManager } = require('discord.js');
const logger = require("./core/logger")
const config = require("../config/config.json")

const chalk = require("chalk")
// eslint-disable-next-line
const shard = new ShardingManager(`${__dirname}/index.js`, { 
    totalShards: config.bot.shards, 
    respawn: true,
});

shard.on('shardCreate', shard => {
    logger.info(`Iniciando a shard ${shard.id}`)
});
const logo = require('fs').readFileSync('./logo.txt').toString()
console.log(chalk.blueBright(logo), '\n');
shard.spawn();