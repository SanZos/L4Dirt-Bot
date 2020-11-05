"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ping = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        message.channel.send('Pong.');
    },
};
exports.default = ping;
