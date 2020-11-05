"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kick = {
    name: 'kick',
    description: 'Fais semblant de kicker le membre marqué.',
    guildOnly: true,
    cooldown: 5,
    execute(message) {
        if (!message.mentions.users.size) {
            return message.reply('Vous devez désigner un utilisateur pour pouvoir le kicker!');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`Vous avez voulu kick: ${taggedUser === null || taggedUser === void 0 ? void 0 : taggedUser.username}`);
    },
};
exports.default = kick;
