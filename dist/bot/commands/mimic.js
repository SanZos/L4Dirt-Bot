"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mimic = {
    name: 'mimic',
    roles: ['@admin'],
    description: 'Mimic the command sender voice status for all people in voice channel.',
    guildOnly: true,
    execute(message) {
        var _a, _b;
        if (((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.highest.id) !== ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.roles.highest.id))
            return;
        const cb = (oldState, newState) => {
            var _a;
            if (message.author.id === oldState.id) {
                const channel = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(channel => channel.type === 'voice' && channel.members.some(member => member.id === message.author.id));
                if (channel === undefined)
                    return;
                const members = channel.members;
                members.forEach(member => {
                    if (member.id !== message.author.id) {
                        member.voice.setMute(!!newState.selfMute);
                    }
                    else {
                        message.channel.send(`Server ${newState.mute ? 'muted' : 'unmuted'} by ${message.author.username}`)
                            .then(_message => setTimeout(() => _message.delete(), 5000));
                    }
                });
            }
        };
        message.author.client.off('voiceStateUpdate', cb);
        message.author.client.on('voiceStateUpdate', cb);
    }
};
exports.default = mimic;
