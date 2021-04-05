"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const logger_1 = __importDefault(require("./core/logger"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
// eslint-disable-next-line
const shard = new discord_js_1.ShardingManager(`${__dirname}/index.js`, {
    totalShards: 2,
    respawn: true,
});
shard.on('shardCreate', shard => {
    logger_1.default.info(`Starting shard ${shard.id}`);
});
const logo = fs_1.default.readFileSync('./logo.txt').toString();
console.log(chalk_1.default.blueBright(logo), '\n');
shard.spawn();
