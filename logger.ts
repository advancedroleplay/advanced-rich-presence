import * as winston from "winston";
import { config } from "./common/config";
import * as path from "path";
import * as fs from "fs";

const LoggerLevel = config.logger.level;
const LoggerPath = config.logger.path;

if (!fs.existsSync(LoggerPath)) {
  fs.mkdirSync(LoggerPath);
}

export const logger = new winston.Logger({
  level: LoggerLevel,
  transports: [
    new winston.transports.File({
      filename: path.join(LoggerPath, '/errors.log'),
      level: 'error'
    }),
    new winston.transports.Console({ 'timestamp': config.logger.timestamp, 'colorize': config.logger.colorize })
  ]
});
