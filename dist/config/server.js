"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.serverConfig = (() => {
    let _configuration;
    console.log(path_1.default.resolve(__dirname, '../../'));
    if (fs_1.default.existsSync(path_1.default.resolve(__dirname, '../../config.json'))) {
        _configuration = require(path_1.default.resolve(__dirname, '../../config.json')).server;
    }
    else {
        _configuration = {
            port: 8080,
        };
        if (process.env.L4DB_HTTP_PORT) {
            _configuration.port = Number.parseInt(process.env.L4DB_HTTP_PORT);
        }
    }
    return _configuration;
})();
