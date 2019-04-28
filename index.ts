import { logger } from "./logger";

logger.info(`Nodejs version is ${process.version}`);
logger.info('Loading /debtors-checker/ script. Howdy (´・ω・`)');

require('./init_bot.js');
