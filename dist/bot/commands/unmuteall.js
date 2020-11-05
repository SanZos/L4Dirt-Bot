"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unmuteall = {
    name: 'unmuteall',
    roles: ['@admin'],
    description: 'Unmute all people in voice channel of the command sender.',
    execute(message) {
        var _a, _b;
        if (!message.member || !message.guild)
            return;
        if (((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.highest.id) !== ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.roles.highest.id))
            return;
        message.guild.channels.cache
            .filter(channel => channel.type === 'voice')
            .map(channel => channel.members.find(member => member.id === message.author.id))
            .forEach(member => {
            member === null || member === void 0 ? void 0 : member.voice.setSelfMute(false);
        });
        message.channel.send('Server unmuted');
    },
};
exports.default = unmuteall;
