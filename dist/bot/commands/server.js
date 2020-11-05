"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server = {
    name: 'server',
    description: 'Affiche les infos du servers.',
    execute(message) {
        if (message.guild) {
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        }
        else {
            message.channel.send(`Information inconnue sur ce canal...`);
        }
    },
};
exports.default = server;
