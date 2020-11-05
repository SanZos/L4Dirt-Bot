import { Message, VoiceState } from 'discord.js';
import { ICommands } from '.';

const mimic: ICommands = {
    name: 'mimic',
    roles: ['@admin'],
    description: 'Mimic the command sender voice status for all people in voice channel.',
    guildOnly: true,
    execute(message: Message) {
        if (message.member?.roles.highest.id !== message.guild?.roles.highest.id) return;

        const cb = (oldState: VoiceState, newState: VoiceState) => {
            if (message.author.id === oldState.id) {
                const channel = message.guild?.channels.cache
                    .find(channel => channel.type === 'voice' && channel.members.some(member => member.id === message.author.id))
                if (channel === undefined) return;
                const members = channel.members;
                members.forEach(member => {
                    if (member.id !== message.author.id) {
                        member.voice.setMute(!!newState.selfMute);
                    } else {
                        message.channel.send(`Server ${newState.mute ? 'muted' : 'unmuted'} by ${message.author.username}`)
                            .then(_message => setTimeout(() => _message.delete(), 5000));
                    }
                });
            }
        }
        message.author.client.off('voiceStateUpdate', cb);
        message.author.client.on('voiceStateUpdate', cb);
    }
};
export default mimic;