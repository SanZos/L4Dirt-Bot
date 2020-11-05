"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatar = void 0;
exports.avatar = {
    name: 'avatar',
    aliases: ['icon', 'icone'],
    description: 'Récupère l\'URL de l\'utilisateur marqué, ou votre propre avatar..',
    execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Votre avatar: ${message.author.displayAvatarURL}`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `Avatar de ${user.username}: ${user.displayAvatarURL}`;
        });
        message.channel.send(avatarList);
    },
};
exports.default = exports.avatar;
