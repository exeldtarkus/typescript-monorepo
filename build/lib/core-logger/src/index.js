"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELogLevels = exports.ELogStage = void 0;
/* eslint-disable no-console */
var moment_1 = __importDefault(require("moment"));
var dotenv_1 = __importDefault(require("dotenv"));
var chalk_1 = __importDefault(require("chalk"));
var common_tags_1 = require("common-tags");
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
var loggerConfig = function (logLevel) {
    var str = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        str[_i - 1] = arguments[_i];
    }
    if ((str === null || str === void 0 ? void 0 : str.length) > 0) {
        var mappingStr = [];
        for (var _a = 0, str_1 = str; _a < str_1.length; _a++) {
            var itemStr = str_1[_a];
            var convertToString = '';
            try {
                if (typeof itemStr !== 'string') {
                    convertToString = (0, common_tags_1.oneLine)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), JSON.stringify(itemStr));
                }
                else {
                    convertToString = itemStr;
                }
            }
            catch (err) {
                return console.log(chalk_1.default.yellow("".concat(ELogLevels.warn, " | [Cannot Convert JSON] - [Please Manual Check Log] - ").concat(err)));
            }
            mappingStr.push(convertToString);
        }
        var fullStr = mappingStr.join(' - ');
        switch (logLevel) {
            case ELogLevels.info: {
                return console.log(chalk_1.default.green("".concat(ELogLevels.info, "    | ")), fullStr);
            }
            case ELogLevels.warn: {
                return console.log(chalk_1.default.yellow("".concat(ELogLevels.warn, " | ")), fullStr);
            }
            case ELogLevels.trace: {
                return console.log(chalk_1.default.gray("".concat(ELogLevels.trace, " | ")), fullStr);
            }
            case ELogLevels.debug: {
                if (process.env.APP_DEBUG === 'true') {
                    return console.log(chalk_1.default.magenta("".concat(ELogLevels.debug, "   | ")), fullStr);
                }
                break;
            }
            case ELogLevels.error: {
                return console.log(chalk_1.default.red("".concat(ELogLevels.error, " - [").concat((0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), "] | ")), fullStr);
            }
            case ELogLevels.fatal: {
                return console.log(chalk_1.default.red("".concat(ELogLevels.fatal, " - [").concat((0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), "] | ")), fullStr);
            }
            case ELogLevels.nothing: {
                console.log(chalk_1.default.white("".concat(ELogLevels.nothing, "   | ")), fullStr);
                break;
            }
            default: {
                return console.log(chalk_1.default.red('[ERROR] - [logLevel] - [NOT FOUND]'));
            }
        }
    }
};
var logger = function () { };
logger.info = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.info], str, false));
};
logger.warn = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.warn], str, false));
};
logger.error = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.error], str, false));
};
logger.nothing = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.nothing], str, false));
};
logger.debug = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.debug], str, false));
};
logger.trace = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.trace], str, false));
};
logger.fatal = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return loggerConfig.apply(void 0, __spreadArray([ELogLevels.fatal], str, false));
};
exports.default = logger;
var templateObject_1;
