import { ShardingManager } from 'discord.js';
import config from '../config/config.json';
import logger from './core/logger';
import chalk from 'chalk';
import fs from 'fs';

// eslint-disable-next-line
const shard = new ShardingManager(`${__dirname}/index.js`, { 
    totalShards: config.bot.shards, 
    respawn: true,
});

shard.on('shardCreate', shard => {
    logger.info(`Starting shard ${shard.id}`)
});

const logo = fs.readFileSync('./logo.txt').toString()
console.log(chalk.blueBright(logo), '\n');
shard.spawn();