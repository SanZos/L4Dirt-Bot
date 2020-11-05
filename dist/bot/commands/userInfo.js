"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userInfo = {
    name: 'user-info',
    description: 'Affiche vos informations.',
    execute(message) {
        message.channel.send(`Votre username: ${message.author.username}\nVotre ID: ${message.author.id}`);
    },
};
exports.default = userInfo;
