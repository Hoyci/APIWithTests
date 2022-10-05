<<<<<<< HEAD
/* istanbul ignore file */

import winston from "winston";
import config from "../../config";

const prettyJson = winston.format.printf(info => {
    if (info.message.constructor === Object) {
=======
import winston from "winston";

import config from "../../config";


// npm debug levels (winston default):
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

const prettyJson = winston.format.printf(info => {
    if (info.message.constructor == Object) {
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f
        info.message = JSON.stringify(info.message, null, 4)
    }
    return `${info.timestamp} ${info.label || '-' } ${info.level}: ${info.message}`
});

const logger = winston.createLogger({
<<<<<<< HEAD
    level: config.loggerLevel === 'silent' ? undefined : config.loggerLevel,
=======
    level: config.loggerLevel === 'silent' ? undefined : config.loggerLevel;
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f
    silent: config.loggerLevel === 'silent',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        prettyJson
    ),
    defaultMeta: {service: 'api-example'},
    transports: [new winston.transports.Console({})]
});

export default logger