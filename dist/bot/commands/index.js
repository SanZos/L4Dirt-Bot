"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAliasesWithCommandsName = void 0;
const argsInfo_1 = __importDefault(require("./argsInfo"));
const avatar_1 = __importDefault(require("./avatar"));
const beep_1 = __importDefault(require("./beep"));
const help_1 = __importDefault(require("./help"));
const kick_1 = __importDefault(require("./kick"));
const meteo_1 = __importDefault(require("./meteo"));
const mimic_1 = __importDefault(require("./mimic"));
const muteall_1 = __importDefault(require("./muteall"));
const ping_1 = __importDefault(require("./ping"));
const prune_1 = __importDefault(require("./prune"));
const server_1 = __importDefault(require("./server"));
const unmuteall_1 = __importDefault(require("./unmuteall"));
const userInfo_1 = __importDefault(require("./userInfo"));
const commands = {
    argsInfo: argsInfo_1.default,
    avatar: avatar_1.default,
    beep: beep_1.default,
    help: help_1.default,
    kick: kick_1.default,
    meteo: meteo_1.default,
    mimic: mimic_1.default,
    muteall: muteall_1.default,
    ping: ping_1.default,
    prune: prune_1.default,
    server: server_1.default,
    unmuteall: unmuteall_1.default,
    userInfo: userInfo_1.default
};
exports.default = commands;
exports.getAliasesWithCommandsName = () => {
    const _map = new Map();
    for (const command of Object.values(commands)) {
        _map.set(command.name, command.name);
        if (command.aliases) {
            for (const alias in command.aliases) {
                _map.set(alias, command.name);
            }
        }
    }
    return _map;
};
