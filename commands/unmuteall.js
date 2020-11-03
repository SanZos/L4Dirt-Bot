const { prefix } = require('../config.json');

module.exports = {
    name: 'unmuteall',
    roles: '@admin',
    description: 'Unmute all people in voice channel of the command sender.',
    usage: `${prefix}unmuteall`,
    execute(message) {
        if (message.member.roles.highest.id !== message.guild.roles.highest.id) return;

        const members = message.guild.channels.cache
            .filter(channel => channel.type === 'voice' && channel.name === 'Salon Kiwi')
            .find(channel => channel.members.find(member => member.id === message.author.id)).members;
        members.forEach(member => {
            member.voice.setMute(false);
        });
        message.channel.send('Server unmuted');
    },
};
