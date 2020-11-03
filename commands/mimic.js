const { prefix } = require('../config.json');

module.exports = {
    name: 'mimic',
    description: 'Mimic the command sender voice status for all people in voice channel.',
    usage: `${prefix}mimic`,
    execute(message) {
        const cb = (oldState, newState) => {
            if (message.author.id === oldState.id) {
                const members = message.guild.channels.cache
                    .filter(channel => channel.type === 'voice' && channel.name === 'Salon Kiwi')
                    .find(channel => channel.members.find(member => member.id === message.author.id)).members;
                members.forEach(member => {
                    if (member.id !== message.author.id) {
                        member.voice.setMute(newState.selfMute);
                    } else {
                        // message.channel.send(`Server ${newState.mute ? 'muted' : 'unmuted'}`);
                        message.author.send(`Server ${newState.mute ? 'muted' : 'unmuted'}`, { tts: true })
                            .then(_message => setTimeout(() => _message.delete(), 3000));
                    }
                });
            }
        }
        message.author.client.off('voiceStateUpdate', cb);
        message.author.client.on('voiceStateUpdate', cb);
    }
};
