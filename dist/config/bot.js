"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.botConfig = (() => {
    let _configuration;
    if (fs_1.default.existsSync(path_1.default.resolve(__dirname, '../../config.json'))) {
        _configuration = require(path_1.default.resolve(__dirname, '../../config.json')).bot;
    }
    else {
        _configuration = {
            token: '',
            prefix: [
                "!",
                "?"
            ],
            weatherApiKey: '',
            globalCooldown: 3
        };
        if (process.env.L4DB_DISCORD_TOKEN) {
            _configuration.token = process.env.L4DB_DISCORD_TOKEN;
        }
        if (process.env.L4DB_DISCORD_PREFIX) {
            _configuration.prefix = new Array(process.env.L4DB_DISCORD_PREFIX);
        }
        if (process.env.L4DB_DISCORD_WEATHER_KEY) {
            _configuration.weatherApiKey = process.env.L4DB_DISCORD_WEATHER_KEY;
        }
        if (process.env.L4DB_DISCORD_GCD) {
            _configuration.globalCooldown = Number.parseInt(process.env.L4DB_DISCORD_GCD);
        }
    }
    return _configuration;
})();
