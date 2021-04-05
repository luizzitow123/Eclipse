import { ShardingManager } from 'discord.js';
import logger from './core/logger';
import chalk from 'chalk';
import fs from 'fs';

// eslint-disable-next-line
const shard = new ShardingManager(`${__dirname}/index.js`, { 
    totalShards: 2, 
    respawn: true,
});

shard.on('shardCreate', shard => {
    logger.info(`Starting shard ${shard.id}`)
});

const logo = fs.readFileSync('./logo.txt').toString()
console.log(chalk.blueBright(logo), '\n');
shard.spawn();