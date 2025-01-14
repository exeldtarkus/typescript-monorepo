"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELogLevels = exports.ELogStage = void 0;
/* eslint-disable no-console */
const moment_1 = __importDefault(require("moment"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const common_tags_1 = require("common-tags");
dotenv_1.default.config();
var ELogLevels;
(function (ELogLevels) {
    ELogLevels["error"] = "[ERROR]";
    ELogLevels["warn"] = "[WARNING]";
    ELogLevels["info"] = "[INFO]";
    ELogLevels["http"] = "[HTTP]";
    ELogLevels["debug"] = "[DEBUG]";
    ELogLevels["trace"] = "[TRACE]";
    ELogLevels["fatal"] = "[FATAL]";
    ELogLevels["nothing"] = "[NOTHING]";
})(ELogLevels || (exports.ELogLevels = ELogLevels = {}));
var ELogStage;
(function (ELogStage) {
    ELogStage["start"] = "[START]";
    ELogStage["process"] = "[PROCESSING]";
    ELogStage["end"] = "[END]";
})(ELogStage || (exports.ELogStage = ELogStage = {}));
const loggerConfig = (logLevel, ...str) => {
    if (str?.length > 0) {
        const mappingStr = [];
        for (const itemStr of str) {
            let convertToString = '';
            try {
                if (typeof itemStr !== 'string') {
                    convertToString = (0, common_tags_1.oneLine) `${JSON.stringify(itemStr)}`;
                }
                else {
                    convertToString = itemStr;
                }
            }
            catch (err) {
                return console.log(chalk_1.default.yellow(`${ELogLevels.warn} | [Cannot Convert JSON] - [Please Manual Check Log] - ${err}`));
            }
            mappingStr.push(convertToString);
        }
        const fullStr = mappingStr.join(' - ');
        switch (logLevel) {
            case ELogLevels.info: {
                return console.log(chalk_1.default.green(`${ELogLevels.info}    | `), fullStr);
            }
            case ELogLevels.warn: {
                return console.log(chalk_1.default.yellow(`${ELogLevels.warn} | `), fullStr);
            }
            case ELogLevels.trace: {
                return console.log(chalk_1.default.gray(`${ELogLevels.trace} | `), fullStr);
            }
            case ELogLevels.debug: {
                if (process.env.APP_DEBUG === 'true') {
                    return console.log(chalk_1.default.magenta(`${ELogLevels.debug}   | `), fullStr);
                }
                break;
            }
            case ELogLevels.error: {
                return console.log(chalk_1.default.red(`${ELogLevels.error} - [${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}] | `), fullStr);
            }
            case ELogLevels.fatal: {
                return console.log(chalk_1.default.red(`${ELogLevels.fatal} - [${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}] | `), fullStr);
            }
            case ELogLevels.nothing: {
                console.log(chalk_1.default.white(`${ELogLevels.nothing}   | `), fullStr);
                break;
            }
            default: {
                return console.log(chalk_1.default.red('[ERROR] - [logLevel] - [NOT FOUND]'));
            }
        }
    }
};
const logger = () => { };
logger.info = (...str) => {
    return loggerConfig(ELogLevels.info, ...str);
};
logger.warn = (...str) => {
    return loggerConfig(ELogLevels.warn, ...str);
};
logger.error = (...str) => {
    return loggerConfig(ELogLevels.error, ...str);
};
logger.nothing = (...str) => {
    return loggerConfig(ELogLevels.nothing, ...str);
};
logger.debug = (...str) => {
    return loggerConfig(ELogLevels.debug, ...str);
};
logger.trace = (...str) => {
    return loggerConfig(ELogLevels.trace, ...str);
};
logger.fatal = (...str) => {
    return loggerConfig(ELogLevels.fatal, ...str);
};
exports.default = logger;
//# sourceMappingURL=index.js.map