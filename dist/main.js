"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const bot_1 = require("./bot");
const server_1 = require("./web/server");
server_1.server.listen(process.env.PORT || 8080);
exports.bot = new bot_1.Left4DirtBot();
exports.bot.login();
