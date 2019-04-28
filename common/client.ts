import { config } from "./config";
import { logger } from "../logger";
const Discord = require('discord.js');

const c = new Discord.Client();

c.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

c.login(config.bot.token);

export const client = c;
