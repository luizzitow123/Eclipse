import { ShardingManager } from 'discord.js';
import config from '../config/config.json';
import logger from './core/logger';
import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs';
require('./structures/checkVersion')
const logo = fs.readFileSync('./logo.txt').toString()
console.log(chalk.blueBright(logo), '\n');

// eslint-disable-next-line
const shard = new ShardingManager(`${__dirname}/index.js`, {
    token: config.bot.token,
    totalShards: config.bot.shards || "auto",
    respawn: true,
});

shard.on('shardCreate', shard => {
    logger.info(`Starting shard ${shard.id}`)
});

shard.spawn();